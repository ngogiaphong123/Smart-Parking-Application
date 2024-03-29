
import axios from "axios";
import prisma from "../../utils/prisma";
import { updatePriceToAdafruitService as updateLCDToAdafruitService, updateServoStatusToAdafruitService } from "../device/servo/servo.service";
import { io } from "../..";
import ResponseBody from "../../utils/responseBody";
import log from "../../utils/logger";
import { date } from "zod";

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
        log.error(error);
        return null;
    }
}
export const updateRfidToAdafruitService = async (status: string) => {
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
        const { data } = await axios.post(url, {
            value: status
        }, config);
        return new ResponseBody("Success", "Update rfid to adafruit service success", data);
    }
    catch (error) {
        log.error(error);
        return null;
    }
}

export const verifyRfid = async (rfidNumber: string) => {
    let vehicle = await prisma.vehicle.findFirst({
        where: {
            rfidNumber: rfidNumber
        },
        select: {
            vehicleId: true,
            model: true,
            genre: true,
            numberPlate: true,
            rfidNumber: true,
            ownerId: true,
        }
    });
    if (!vehicle) {
        await updateLCDToAdafruitService("No vehicle found");
        return;
    }
    let parkingSlot = await prisma.parkingSlot.findFirst({
        where: {
            vehicleId: vehicle.vehicleId
        }
    })
    log.info(parkingSlot)
    // no reserved parking slot
    if (!parkingSlot) {
        log.info("No reserved")
        let availableParkingSlot = await prisma.parkingSlot.findFirst({
            where: {
                status: "AVAILABLE"
            },
        })
        if (!availableParkingSlot) {
            await updateLCDToAdafruitService("No available slot");
            return;
        }
        await prisma.logs.create({
            data: {
                vehicleId: vehicle.vehicleId,
                parkingSlotId: availableParkingSlot.parkingSlotId,
                state: "IN"
            }
        })
        // update parking slot
        const updatedParkingSlot = await prisma.parkingSlot.update({
            where: {
                parkingSlotId: availableParkingSlot.parkingSlotId
            },
            data: {
                status: "OCCUPIED",
                reservedById: vehicle.ownerId,
                vehicleId: vehicle.vehicleId,
                startTime: new Date(),
            },
            select: {
                parkingSlotId: true,
                status: true,
                reservedById: true,
                pricePerHour: true,
                startTime: true,
                reservedBy: {
                    select: {
                        accountId: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatarUrl: true,
                    }
                },
                vehicle: {
                    select: {
                        vehicleId: true,
                        model: true,
                        genre: true,
                        numberPlate: true,
                        rfidNumber: true,
                    }
                }
            }
        });
        const res = new ResponseBody("Success", "Check in success", [updatedParkingSlot]);
        const length = updatedParkingSlot.parkingSlotId.length;
        // send last two character of parking slot id to adafruit using slice
        const sentString = `Please go to ${updatedParkingSlot.parkingSlotId[length - 2] + updatedParkingSlot.parkingSlotId[length - 1]}`;
        io.emit("parking-slot-channel", res);
        await updateLCDToAdafruitService(`${sentString}`)
        await updateServoStatusToAdafruitService("1");
        return res;
    }
    else {
        if (parkingSlot.status === "RESERVED") {
            log.info("Reserved")
            await prisma.logs.create({
                data: {
                    vehicleId: vehicle.vehicleId,
                    parkingSlotId: parkingSlot.parkingSlotId,
                    state: "IN"
                }
            });
            // update parking slot
            const updatedParkingSlot = await prisma.parkingSlot.update({
                where: {
                    parkingSlotId: parkingSlot.parkingSlotId
                },
                data: {
                    status: "OCCUPIED",
                    reservedById: vehicle.ownerId,
                    vehicleId: vehicle.vehicleId,
                    startTime: new Date(),
                },
                select: {
                    parkingSlotId: true,
                    status: true,
                    reservedById: true,
                    pricePerHour: true,
                    startTime: true,
                    reservedBy: {
                        select: {
                            accountId: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            avatarUrl: true,
                        }
                    },
                    vehicle: {
                        select: {
                            vehicleId: true,
                            model: true,
                            genre: true,
                            numberPlate: true,
                            rfidNumber: true,
                        }
                    }
                }
            });
            const res = new ResponseBody("Success", "Check in success", [updatedParkingSlot]);
            const length = updatedParkingSlot.parkingSlotId.length;
            // send last two character of parking slot id to adafruit using slice
            const sentString = `Please go to ${updatedParkingSlot.parkingSlotId[length - 2] + updatedParkingSlot.parkingSlotId[length - 1]}`;
            io.emit("parking-slot-channel", res);
            await updateLCDToAdafruitService(`${sentString}`)
            await updateServoStatusToAdafruitService("1");
            return res;
        }
        else if (parkingSlot.status === "OCCUPIED") {
            log.info("Check out")
            let logIn = await prisma.logs.findFirst({
                where: {
                    vehicleId: vehicle.vehicleId,
                    parkingSlotId: parkingSlot.parkingSlotId,
                    state: "IN"
                },
            })
            if (!logIn) {
                if (!logIn) {
                    await updateLCDToAdafruitService("No vehicle found");
                    return;
                }
            }
            const updatedParkingSlot = await prisma.parkingSlot.update({
                where: {
                    parkingSlotId: parkingSlot.parkingSlotId
                },
                data: {
                    status: "AVAILABLE",
                    vehicleId: null,
                    reservedById: null,
                    startTime: null,
                },
                select: {
                    parkingSlotId: true,
                    status: true,
                    reservedById: true,
                    pricePerHour: true,
                    startTime: true,
                    reservedBy: {
                        select: {
                            accountId: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            avatarUrl: true,
                        }
                    },
                    vehicle: {
                        select: {
                            vehicleId: true,
                            model: true,
                            genre: true,
                            numberPlate: true,
                            rfidNumber: true,
                        }
                    }
                }
            });
            const timeIn = new Date(logIn.timeIn);
            const timeOut = new Date();
            const diff = timeOut.getTime() - timeIn.getTime();
            const diffHours = diff / (1000 * 3600);
            const price = Math.ceil(diffHours) * parseInt(parkingSlot.pricePerHour);
            await prisma.logs.update({
                where: {
                    logId: logIn.logId
                },
                data: {
                    state: "OUT",
                    timeOut: new Date(),
                    price: price.toString(),
                }
            });
            const res = new ResponseBody("Success", "Check out success", [updatedParkingSlot]);
            const length = updatedParkingSlot.parkingSlotId.length;
            // send last two character of parking slot id to adafruit using slice
            const sentString = `Please go to ${updatedParkingSlot.parkingSlotId[length - 2] + updatedParkingSlot.parkingSlotId[length - 1]}`;
            io.emit("parking-slot-channel", res);
            await updateLCDToAdafruitService(`${sentString}`)
            await updateServoStatusToAdafruitService("1");
            return res;
        }
    }
}