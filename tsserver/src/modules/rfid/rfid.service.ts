import axios from "axios";
import prisma from "../../utils/prisma";
import { updatePriceToAdafruitService, updateServoStatusToAdafruitService } from "../device/servo/servo.service";
import { io } from "../..";
import responseBody from "../../utils/responseBody";
export const registerRfidService = async (rfid: string) => {
    const newRfid = await prisma.rfid.create({
        data: {
            number: rfid
        }
    })
    return newRfid;
}
export const getRfidFromAdafruitService = async (limit: number) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "thongbao"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
    const config = {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json'
        },
        params: {
            limit: limit
        }
    };
    const { data } = await axios.get(url, config);
    return data;
}
export const updateRfidToAdafruitService = async (status : string) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "thongbao"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
    const config = {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json'
        }
    };
    const {data} = await axios.post(url, {
        value : status
    }, config);
    return new responseBody("Success", "Update rfid to adafruit service success", data);
}
export const verifyRfid = async (rfid: string) => {
    // if : in logs (status : in) => update status : out and count price
    // else : not in logs 
    //  => if : check reserve => create new log (status : in), update parking slot : reserved => occupied and reserveBy : null
    //  else : not reserve => create new log (status : in), update parking slot : available occupied
    const checkRfid = await prisma.rfid.findFirst({
        where: {
            number: rfid
        }
    });
    if (!checkRfid) {
        const res = new responseBody("Error", "Rfid not found",null);
        io.emit("parking-slot-channel", res);
        return res;
    }
    // get vehicle
    const vehicle = await prisma.vehicle.findFirst({
        where: {
            rfidNumber: rfid,
        }
    });
    if (!vehicle) {
        const res = new responseBody("Error", "Vehicle not found",null);
        io.emit("parking-slot-channel", res);
        return res;
    }
    const checkLog = await prisma.logs.findFirst({
        where: {
            vehicleId: vehicle.vehicleId,
            state: "IN",
        },
    });
    if (checkLog) {
        const slotPrice = await prisma.parkingSlot.findFirst({
            where: {
                parkingSlotId: checkLog.parkingSlotId
            },
            select: {
                pricePerHour: true
            }
        })
        if(!slotPrice) {
            const  res = new responseBody("Error", "Parking slot not found",null);
            io.emit("parking-slot-channel", res);
            return res;
        }
        const timeIn = new Date(checkLog.timeIn);
        const timeOut = new Date();
        const diff = timeOut.getTime() - timeIn.getTime();
        const diffHours = diff / (1000 * 3600);
        const price = Math.ceil(diffHours) * parseInt(slotPrice.pricePerHour);
        // update log
        const updateLog = await prisma.logs.update({
            where: {
                logId: checkLog.logId
            },
            data: {
                state: "OUT",
                timeOut: timeOut,
                price: price.toString()
            }
        });
        // update parking slot
        const updateParkingSlot = await prisma.parkingSlot.update({
            where: {
                parkingSlotId: updateLog.parkingSlotId
            },
            data: {
                status: "AVAILABLE",
                reservedById: null
            },
            select : {
                parkingSlotId : true,
                status : true,
                reservedById : true,
                pricePerHour : true,
                reservedBy : {
                    select : {
                        accountId : true,
                        firstName : true,
                        lastName : true,
                        email : true,
                    }
                }
            }
        });
        // update price to adafruit
        const res = new responseBody("Success", "Check out success",updateParkingSlot);
        io.emit("parking-slot-channel",res);
        await updatePriceToAdafruitService(price.toString());
        await updateServoStatusToAdafruitService("1");
        return updateLog;
    }
    else {
        // check reserved
        const checkReserved = await prisma.parkingSlot.findFirst({
            where: {
                reservedById: vehicle.ownerId,
                status: "RESERVED"
            }
        });
        if (checkReserved) {
            // create new log
            const newLog = await prisma.logs.create({
                data: {
                    vehicleId: vehicle.vehicleId,
                    parkingSlotId: checkReserved.parkingSlotId,
                }
            });
            // update parking slot
            const updateParkingSlot = await prisma.parkingSlot.update({
                where: {
                    parkingSlotId: checkReserved.parkingSlotId
                },
                data: {
                    status: "OCCUPIED",
                    reservedById: null
                },
                select : {
                    parkingSlotId : true,
                    status : true,
                    reservedById : true,
                    pricePerHour : true,
                    reservedBy : {
                        select : {
                            accountId : true,
                            firstName : true,
                            lastName : true,
                            email : true,
                        }
                    }
                }
            });
            const res = new responseBody("Success", "Check in success",updateParkingSlot);
            io.emit("parking-slot-channel",res);
            await updateServoStatusToAdafruitService("1");
            return newLog;
        }
        else {
            // create new log
            // find available parking slot
            const availableParkingSlot = await prisma.parkingSlot.findFirst({
                where: {
                    status: "AVAILABLE"
                }
            });
            if(!availableParkingSlot) {
                return null;
            }
            const newLog = await prisma.logs.create({
                data: {
                    vehicleId: vehicle.vehicleId,
                    parkingSlotId: availableParkingSlot.parkingSlotId,
                }
            });
            // update parking slot
            const updateParkingSlot = await prisma.parkingSlot.update({
                where: {
                    parkingSlotId: newLog.parkingSlotId
                },
                data: {
                    status: "OCCUPIED",
                    reservedById: null
                },
                select : {
                    parkingSlotId : true,
                    status : true,
                    reservedById : true,
                    pricePerHour : true,
                    reservedBy : {
                        select : {
                            accountId : true,
                            firstName : true,
                            lastName : true,
                            email : true,
                        }
                    }
                }
            });
            const res = new responseBody("Success", "Check in success",updateParkingSlot);
            io.emit("parking-slot-channel",res);
            await updateServoStatusToAdafruitService("1");
            return newLog;
        }
    }
}