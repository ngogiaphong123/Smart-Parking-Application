import { ParkingSlotInput } from "./parkingSlot.schema";
import prisma from "../../utils/prisma";
import { io } from "../..";
import ResponseBody from "../../utils/responseBody";
export const createParkingSlotService = async (parkingSlot : ParkingSlotInput) => {
    const {pricePerHour} = parkingSlot;
    const newParkingSlot = await prisma.parkingSlot.create({
        data : {
            status : "AVAILABLE",
            pricePerHour,
        },
    })
    return new ResponseBody("Success", "Create parking slot success", newParkingSlot);
}
export const getParkingSlotService = async ({page, limit} :{
    page : string,
    limit : string
}) => {
    const newPage = parseInt(page);
    const newLimit = parseInt(limit);
    const parkingSlot = await prisma.parkingSlot.findMany({
        skip : newPage * newLimit,
        take : newLimit,
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
                    avatarUrl : true,
                }
            },
            vehicle : {
                select : {
                    vehicleId : true,
                    genre : true,
                    model : true,
                    numberPlate : true,
                    rfidNumber : true,
                }
            }
        }
    });
    return new ResponseBody("Success", "Get parking slot success",parkingSlot);
}
export const reservedParkingSlotService = async (parkingSlotId : string, accountId : string, vehicleId  : string) => {
    const parkingSlot = await prisma.parkingSlot.findFirst({
        where : {
            parkingSlotId : parkingSlotId
        }
    }).catch((err) => {
        return null;
    })
    if (!parkingSlot) {
        const res = new ResponseBody("Error", "Parking slot not found",null);
        io.emit("parking-slot-channel",res);
        return res;
    }
    // find vehicle
    const vehicle = await prisma.vehicle.findFirst({
        where : {
            ownerId : accountId,
            vehicleId : vehicleId
        }
    }).catch((err) => {
        return null;
    })
    if (!vehicle) {
        const res = new ResponseBody("Error", "Vehicle is not valid",null);
        io.emit("parking-slot-channel",res);
        return res;
    }
    else {
        // only 1 vehicle can be reserved
        const checkReserved = await prisma.parkingSlot.findFirst({
            where : {
                reservedById : vehicle.ownerId,
                vehicleId : vehicle.vehicleId,
                status : "RESERVED"
            }
        });
        if (checkReserved) {
            const res = new ResponseBody("Error", "You already reserved a parking slot",null);
            // io.emit("parking-slot-channel",res);
            return res;
        }
        if (parkingSlot.status === "AVAILABLE") {
            const updatedParkingSlot = await prisma.parkingSlot.update({
                where : {
                    parkingSlotId : parkingSlotId
                },
                data : {
                    status : "RESERVED",
                    reservedById : vehicle.ownerId,
                    vehicleId : vehicle.vehicleId
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
                            avatarUrl : true,
                        }
                    },
                    vehicle : {
                        select : {
                            vehicleId : true,
                            genre : true,
                            model : true,
                            numberPlate : true,
                            rfidNumber : true,
                        }
                    }
                }
            })
            const res = new ResponseBody("Success", "Reserved parking slot success",updatedParkingSlot);
            io.emit("parking-slot-channel",res);
            return res;
        }
        else {
            const res = new ResponseBody("Error", "Parking slot is not available", null);
            io.emit("parking-slot-channel",res);
            return res;
        }
    }
}

export const getParkingSlotByIdService = async (parkingSlotId : string) => {
    const parkingSlot = await prisma.parkingSlot.findFirst({
        where : {
            parkingSlotId : parkingSlotId
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
                    avatarUrl : true,
                }
            },
            vehicle : {
                select : {
                    vehicleId : true,
                    genre : true,
                    model : true,
                    numberPlate : true,
                    rfidNumber : true,
                }
            }
        }
    })
    return new ResponseBody("Success", "Get parking slot success",parkingSlot);
}