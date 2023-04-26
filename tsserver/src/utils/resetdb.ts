import prisma from "./prisma";

const resetDb = async () => {
    await prisma.user.deleteMany();
    await prisma.logs.deleteMany();
    await prisma.vehicle.deleteMany();
}
resetDb();