import { ParkingSlotInput } from "./parkingSlot.schema";
import prisma from "../../utils/prisma";
import { io } from "../..";
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
    const parkingSlot = prisma.parkingSlot.findMany({
        skip : newPage * newLimit,
        take : newLimit,
    });
    return parkingSlot;
}
export const reservedParkingSlotService = async (parkingSlotId : string, accountId : string) => {
    const parkingSlot = await prisma.parkingSlot.findFirst({
        where : {
            parkingSlotId : parkingSlotId
        }
    });
    if (!parkingSlot) {
        return "Parking slot not found";
    }
    else {
        if (parkingSlot.status === "AVAILABLE") {
            const updatedParkingSlot = await prisma.parkingSlot.update({
                where : {
                    parkingSlotId : parkingSlotId
                },
                data : {
                    status : "RESERVED",
                    reservedBy : accountId
                }
            })
            return updatedParkingSlot;
        }
        else {
            return "Parking slot is not available";
        }
    }
}