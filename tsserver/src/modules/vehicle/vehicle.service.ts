import prisma from "../../utils/prisma";
import { RegisterVehicleInput } from "./vehicle.schema";

export const createVehicleService = async (vehicle : RegisterVehicleInput, accountId : string ) => {
    const rfid = await prisma.rfid.findFirst({});
    if(!rfid) {
        return null;
    }
    const {number} = rfid;
    const {genre, model, numberPlate} = vehicle;
    const newVehicle = await prisma.vehicle.create({
        data : {
            genre,
            model,
            numberPlate,
            rfidNumber : number,
            ownerId : accountId
        },
    })
    return newVehicle;
}