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

export const verifyRfid = async (rfidNumber: string) => {
    // check vehicle in db
    const vehicle = await prisma.vehicle.findUnique({
        where: {
            rfidNumber: rfidNumber
        },
        select: {
            vehicleId: true,
            model: true,
            genre: true,
            ownerId: true,
            parkingSlot : {
                select : {
                    parkingSlotId : true,
                    status : true,
                    reservedById : true,
                    pricePerHour : true,
                }
           }
        }
    });
    if(!vehicle) {
        await updateLCDToAdafruitService("No vehicle found");
        return;
    }
    if(vehicle.parkingSlot.length === 0) {
        // No reserved
        // create new log
        // find available parking slot
        const availableParkingSlot = await prisma.parkingSlot.findFirst({
            where: {
                status: "AVAILABLE"
            }
        });
        if(!availableParkingSlot) {
            await updateLCDToAdafruitService("No vacant slot");
            return;
        }
        const newLog = await prisma.logs.create({
            data: {
                vehicleId: vehicle.vehicleId,
                parkingSlotId: availableParkingSlot.parkingSlotId,
                state : "IN"
            }
        });
        // update parking slot
        const updateParkingSlot = await prisma.parkingSlot.update({
            where: {
                parkingSlotId: newLog.parkingSlotId
            },
            data: {
                status: "OCCUPIED",
                reservedById : vehicle.ownerId,
                vehicleId : vehicle.vehicleId,
                startTime: new Date(),
            },
            select : {
                parkingSlotId : true,
                status : true,
                reservedById : true,
                pricePerHour : true,
                startTime : true,
                reservedBy : {
                    select : {
                        accountId : true,
                        firstName : true,
                        lastName : true,
                        email : true,
                        avatarUrl : true,
                    }
                },
                vehicle : {
                    select : {
                        vehicleId : true,
                        model : true,
                        genre : true,
                        numberPlate : true,
                        rfidNumber : true,
                    }
                }
            }
        });
        const res = new ResponseBody("Success", "Check in success", [updateParkingSlot]);
        const length = updateParkingSlot.parkingSlotId.length;
        // send last two character of parking slot id to adafruit using slice
        const sentString = `Please go to ${updateParkingSlot.parkingSlotId[length - 2] + updateParkingSlot.parkingSlotId[length - 1]}`;
        io.emit("parking-slot-channel",res);
        await updateLCDToAdafruitService(`${sentString}`)
        await updateServoStatusToAdafruitService("1");
        return res;
    }
    else {
        // check if vehicle is reserved
        if(vehicle.parkingSlot[0].status === "RESERVED") {
            // create new log
            const newLog = await prisma.logs.create({
                data: {
                    vehicleId: vehicle.vehicleId,
                    parkingSlotId: vehicle.parkingSlot[0].parkingSlotId,
                    state : "IN"
                }
            });
            // update parking slot
            const updateParkingSlot = await prisma.parkingSlot.update({
                where: {
                    parkingSlotId: newLog.parkingSlotId
                },
                data: {
                    status: "OCCUPIED",
                    vehicleId : vehicle.vehicleId,
                    startTime: new Date(),
                },
                select : {
                    parkingSlotId : true,
                    status : true,
                    reservedById : true,
                    pricePerHour : true,
                    startTime : true,
                    reservedBy : {
                        select : {
                            accountId : true,
                            firstName : true,
                            lastName : true,
                            email : true,
                            avatarUrl : true,
                        }
                    },
                    vehicle : {
                        select : {
                            vehicleId : true,
                            model : true,
                            genre : true,
                            numberPlate : true,
                            rfidNumber : true,
                        }
                    }
                }
            });
            const res = new ResponseBody("Success", "Check in success", [updateParkingSlot]);
            const length = updateParkingSlot.parkingSlotId.length;
            // send last two character of parking slot id to adafruit using slice
            const sentString = `Please go to ${updateParkingSlot.parkingSlotId[length - 2] + updateParkingSlot.parkingSlotId[length - 1]}`;
            io.emit("parking-slot-channel",res);
            await updateLCDToAdafruitService(`${sentString}`)
            await updateServoStatusToAdafruitService("1");
            return res;
        }
        else if (vehicle.parkingSlot[0].status === "OCCUPIED") {
            // update log to state OUT
            const logIn = await prisma.logs.findFirst({
                where: {
                    vehicleId: vehicle.vehicleId,
                    parkingSlotId: vehicle.parkingSlot[0].parkingSlotId,
                    state: "IN"
                }
            })
            if(!logIn) {
                await updateLCDToAdafruitService("No vehicle found");
                return;
            }
            const timeIn = new Date(logIn.timeIn);
            const timeOut = new Date();
            const diff = timeOut.getTime() - timeIn.getTime();
            const diffHours = diff / (1000 * 3600);
            const price = Math.ceil(diffHours) * parseInt(vehicle.parkingSlot[0].pricePerHour);
            const updateLog = await prisma.logs.update({
                where: {
                    logId: logIn.logId  
                },
                data: {
                    state: "OUT",
                    timeOut: new Date(),
                    price: price.toString()
                }
            });
            // update parking slot
            const updateParkingSlot = await prisma.parkingSlot.update({
                where: {
                    parkingSlotId: vehicle.parkingSlot[0].parkingSlotId
                },
                data: {
                    status: "AVAILABLE",
                    vehicleId : null,
                    reservedById : null,
                    startTime: null,
                },
                select : {
                    parkingSlotId : true,
                    status : true,
                    reservedById : true,
                    pricePerHour : true,
                    startTime : true,
                    reservedBy : {
                        select : {
                            accountId : true,
                            firstName : true,
                            lastName : true,
                            email : true,
                            avatarUrl : true,
                        }
                    },
                    vehicle : {
                        select : {
                            vehicleId : true,
                            model : true,
                            genre : true,
                            numberPlate : true,
                            rfidNumber : true,
                        }
                    }
                }
            });
            const res = new ResponseBody("Success", "Check out success", [updateParkingSlot]);
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