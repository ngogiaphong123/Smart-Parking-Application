import prisma from "../../utils/prisma";
import { getNewCustomerCountService } from "../customer/customer.service";
import { GetLogsInput } from "./log.schema";

// model Logs {
//     logId           String @id @map("_id") @default(auto()) @db.ObjectId
//     createdAt       DateTime @default(now())
//     updatedAt       DateTime @updatedAt
//     timeIn          DateTime @default(now())
//     timeOut         DateTime?
//     price           String?
//     state           String @default("IN")
//     parkingSlot     ParkingSlot @relation(fields: [parkingSlotId], references: [parkingSlotId])
//     parkingSlotId   String @db.ObjectId
//     vehicle         Vehicle @relation(fields: [vehicleId], references: [vehicleId])
//     vehicleId       String @db.ObjectId
// }
export const getLogsService = async (input: GetLogsInput) => {
    const { page, limit } = input;
    const logs = await prisma.logs.findMany({
        skip: page * limit,
        take: limit,
        select: {
            logId: true,
            timeIn: true,
            timeOut: true,
            price: true,
            state: true,
            parkingSlot : {
                select : {
                    parkingSlotId : true,
                    pricePerHour : true,
                }
            },
            vehicle : {
                select : {
                    vehicleId : true,
                    genre : true,
                    model : true,
                    numberPlate : true,
                    rfidNumber : true,
                    user : {
                        select : {
                            accountId : true,
                            email : true,
                            firstName : true,
                            lastName : true,
                            phone : true,
                            avatarUrl : true,
                        }
                    }
                }
            }
        }
    });
    return logs;
}

export const getMyLogService = async (accountId : string) => {
    const logs = await prisma.logs.findMany({
        where : {
            vehicle : {
                user : {
                    accountId : accountId
                }
            }
        },
        select: {
            logId: true,
            timeIn: true,
            timeOut: true,
            price: true,
            state: true,
            parkingSlot : {
                select : {
                    parkingSlotId : true,
                    pricePerHour : true,
                }
            },
            vehicle : {
                select : {
                    vehicleId : true,
                    genre : true,
                    model : true,
                    numberPlate : true,
                    rfidNumber : true,
                    user : {
                        select : {
                            accountId : true,
                            email : true,
                            firstName : true,
                            lastName : true,
                            phone : true,
                            avatarUrl : true,
                        }
                    }
                }
            }
        }
    });
    return logs;
}

export const getLogsDateService = async ({start,end} : {
    start : Date,
    end : Date
}) => {
    // time in >= start && time in <= end
    const logs = await prisma.logs.findMany({
        where : {
            timeIn : {
                gte : start,
                lte : end
            }
        },
        select: {
            logId: true,
            timeIn: true,
            timeOut: true,
            price: true,
            state: true,
            parkingSlot : {
                select : {
                    parkingSlotId : true,
                    pricePerHour : true,
                }
            },
            vehicle : {
                select : {
                    vehicleId : true,
                    genre : true,
                    model : true,
                    numberPlate : true,
                    rfidNumber : true,
                    user : {
                        select : {
                            accountId : true,
                            email : true,
                            firstName : true,
                            lastName : true,
                            phone : true,
                            avatarUrl : true,
                        }
                    }
                }
            }
        }
    });
    const totalRecords = logs.length;
    // get prices of logs
    const prices = logs.map(log => log.price);
    // calculate total price
    let revenue = 0;
    for(let i = 0; i < prices.length; i++) {
        if(prices[i]) {
            revenue += parseInt(prices[i] as string);
        }
    }
    const newCustomerCount = await getNewCustomerCountService({start,end});
    return {totalRecords, revenue, newCustomerCount , logs};
}