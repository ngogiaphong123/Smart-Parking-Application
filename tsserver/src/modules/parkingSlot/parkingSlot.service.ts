import { ParkingSlotInput } from "./parkingSlot.schema";
import prisma
 from "../../utils/prisma";
export const createParkingSlotService = async (parkingSlot : ParkingSlotInput) => {
    const {status, pricePerHour} = parkingSlot;
    const newParkingSlot = await prisma.parkingSlot.create({
        data : {
            status,
            pricePerHour
        },
    })
    return newParkingSlot;
}