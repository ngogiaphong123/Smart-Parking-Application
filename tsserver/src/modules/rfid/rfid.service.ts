import prisma from "../../utils/prisma";
export const registerRfidService = async (rfid : string) => {
    const newRfid = await prisma.rfid.create({
        data : {
            number : rfid
        }
    })
    return newRfid;
}