import axios from "axios";
import prisma from "../../utils/prisma";
import { updateServoStatusToAdafruitService } from "../device/servo/servo.service";
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
        return "Rfid not found";
    }
    // get vehicle
    const vehicle = await prisma.vehicle.findFirst({
        where: {
            rfidNumber: rfid
        }
    });
    if (!vehicle) {
        return "Vehicle not found";
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
            return "Slot price not found";
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
                reservedBy: null
            }
        });
        return updateLog;
    }
    else {
        // check reserved
        const checkReserved = await prisma.parkingSlot.findFirst({
            where: {
                reservedBy: vehicle.vehicleId,
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
                    reservedBy: null
                }
            });
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
                    reservedBy: null
                }
            });
            return newLog;
        }
    }
}