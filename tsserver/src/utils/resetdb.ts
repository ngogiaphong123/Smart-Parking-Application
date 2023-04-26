import prisma from "./prisma";

const resetDb = async () => {
    await prisma.logs.deleteMany();
}
resetDb();