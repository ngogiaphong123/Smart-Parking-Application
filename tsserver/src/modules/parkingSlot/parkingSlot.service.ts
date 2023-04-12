import { ParkingSlotInput } from "./parkingSlot.schema";
import prisma from "../../utils/prisma";
import { io } from "../..";
import responseBody from "../../utils/responseBody";
export const createParkingSlotService = async (parkingSlot : ParkingSlotInput) => {
    const {pricePerHour} = parkingSlot;
    const newParkingSlot = await prisma.parkingSlot.create({
        data : {
            status : "AVAILABLE",
            pricePerHour,
        },
    })
    return newParkingSlot;
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
                }
            }
        }
    });
    return new responseBody("Success", "Get parking slot success",parkingSlot);
}
export const reservedParkingSlotService = async (parkingSlotId : string, accountId : string) => {
    const parkingSlot = await prisma.parkingSlot.findFirst({
        where : {
            parkingSlotId : parkingSlotId
        }
    });
    if (!parkingSlot) {
        const res = new responseBody("Error", "Parking slot not found",null);
        io.emit("parking-slot-channel",res);
        return;
    }
    // find vehicle
    const vehicle = await prisma.vehicle.findFirst({
        where : {
            ownerId : accountId
        }
    });
    if (!vehicle) {
        const res = new responseBody("Error", "Vehicle not found",null);
        return;
    }
    else {
        if (parkingSlot.status === "AVAILABLE") {
            const updatedParkingSlot = await prisma.parkingSlot.update({
                where : {
                    parkingSlotId : parkingSlotId
                },
                data : {
                    status : "RESERVED",
                    reservedById : vehicle.ownerId
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
            })
            const res = new responseBody("Success", "Reserved parking slot success",updatedParkingSlot);
            io.emit("parking-slot-channel",res);
            return updatedParkingSlot;
        }
        else {
            const res = new responseBody("Error", "Parking slot is not available",null);
            io.emit("parking-slot-channel",res);
            return;
        }
    }
}