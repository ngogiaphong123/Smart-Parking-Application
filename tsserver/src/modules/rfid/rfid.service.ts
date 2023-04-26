import axios from "axios";
import prisma from "../../utils/prisma";
import { updatePriceToAdafruitService as updateLCDToAdafruitService, updateServoStatusToAdafruitService } from "../device/servo/servo.service";
import { io } from "../..";
import ResponseBody from "../../utils/responseBody";
import log from "../../utils/logger";
export const registerRfidService = async (rfid: string) => {
    const newRfid = await prisma.rfid.create({
        data: {
            number: rfid
        }
    })
    return new ResponseBody("Success", "Register rfid success", newRfid);
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
    try {
        const { data } = await axios.get(url, config);
        return data;
    }
    catch (error) {
        log.info(error);
        return null;
    }
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
    try {
        const {data} = await axios.post(url, {
            value : status
        }, config);
        return new ResponseBody("Success", "Update rfid to adafruit service success", data);
    }
    catch (error) {
        log.info(error);
        return null;
    }
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
        const res = new ResponseBody("Error", "Rfid not found",null);
        io.emit("parking-slot-channel", res);
        await updateLCDToAdafruitService("Rfid not found");
        return res;
    }
    // get vehicle
    const vehicle = await prisma.vehicle.findFirst({
        where: {
            rfidNumber: rfid,
        }
    });
    if (!vehicle) {
        const res = new ResponseBody("Error", "No vehicle found",null);
        io.emit("parking-slot-channel", res);
        await updateLCDToAdafruitService("No vehicle found");
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
            const res = new ResponseBody("Error", "Parking slot not found",null);
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
        const res = new ResponseBody("Success", "Check out success",updateParkingSlot);
        io.emit("parking-slot-channel",res);
        await updateLCDToAdafruitService(`Price : ${price.toString()}`);
        await updateServoStatusToAdafruitService("1");
        return res;
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
            const res = new ResponseBody("Success", "Check in success",updateParkingSlot);
            io.emit("parking-slot-channel",res);
            const length = updateParkingSlot.parkingSlotId.length;
            const sentString = `Please go to ${updateParkingSlot.parkingSlotId[length - 2] + updateParkingSlot.parkingSlotId[length - 1]}`;
            await updateLCDToAdafruitService(`${sentString}`)
            await updateServoStatusToAdafruitService("1");
            return res;
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
                await updateLCDToAdafruitService("No vacant slot");
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
            const res = new ResponseBody("Success", "Check in success",updateParkingSlot);
            const length = updateParkingSlot.parkingSlotId.length;
            // send last two character of parking slot id to adafruit using slice
            const sentString = `Please go to ${updateParkingSlot.parkingSlotId[length - 2] + updateParkingSlot.parkingSlotId[length - 1]}`;
            io.emit("parking-slot-channel",res);
            await updateLCDToAdafruitService(`${sentString}`)
            await updateServoStatusToAdafruitService("1");
            return res;
        }
    }
}