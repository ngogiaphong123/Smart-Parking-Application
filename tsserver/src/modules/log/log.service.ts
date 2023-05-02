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
        },
        orderBy : {
            timeIn : "desc"
        }
    });
    const count = await prisma.logs.findMany({
        select: {
            logId: true,
            price: true,
        }
    });
    let totalPay = 0;
    for (let i = 0; i < count.length; i++) {
        if(count[i].price) {
            totalPay += parseInt(count[i].price as string);
        }
    }
    return {logsCount : count.length, totalPay,logs}; 
}

export const getMyLogService = async (accountId : string, page : number, limit : number) => {
    const logs = await prisma.logs.findMany({
        skip: page * limit,
        take: limit,
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
        },
        orderBy : {
            timeIn : "desc"
        }
    });
    const count = await prisma.logs.findMany({
        where : {
            vehicle : {
                user : {
                    accountId : accountId
                }
            }
        },
        select: {
            logId: true,
            price: true,
        }
    })
    let totalPay = 0;
    for (let i = 0; i < count.length; i++) {
        if(count[i].price) {
            totalPay += parseInt(count[i].price as string);
        }
    }
    return {logsCount : count.length, totalPay,logs};
}

export const getLogsDateService = async ({start,end,page,limit} : {
    start : Date,
    end : Date,
    page : number,
    limit : number
}) => {
    // time in >= start && time in <= end
    const logs = await prisma.logs.findMany({
        skip: page * limit,
        take: limit,
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
        },
        orderBy : {
            timeIn : "desc"
        }
    });
    const logsFull = await prisma.logs.findMany({
        where : {
            timeIn : {
                gte : start,
                lte : end
            }
        },
        select: {
            logId: true,
            timeIn: true,
            price: true,
        },
        orderBy : {
            timeIn : "desc"
        }
    })
    const logsCount = logsFull.length;
    // get prices of logs
    const prices = logsFull.map(log => log.price);
    // calculate total price
    let totalPay = 0;
    for(let i = 0; i < prices.length; i++) {
        if(prices[i]) {
            totalPay += parseInt(prices[i] as string);
        }
    }
    const newCustomerCount = await getNewCustomerCountService({start,end});
    return {logsCount, totalPay, newCustomerCount , logs};
}

export const getLogsCustomerDateService = async ({accountId,start,end,page,limit} : {
    accountId : string,
    start : Date,
    end : Date,
    page : number,
    limit : number
}) => {
    const logs = await prisma.logs.findMany({
        skip: page * limit,
        take: limit,
        where : {
            timeIn : {
                gte : start,
                lte : end
            },
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
        },
        orderBy : {
            timeIn : "desc"
        }
    });
    const logsFull = await prisma.logs.findMany({
        where : {
            timeIn : {
                gte : start,
                lte : end
            },
            vehicle : {
                user : {
                    accountId : accountId
                }
            }
        },
        select: {
            logId: true,
            timeIn: true,
            price: true,
        },
        orderBy : {
            timeIn : "desc"
        }
    })
    const logsCount = logsFull.length;
    // get prices of logs
    const prices = logsFull.map(log => log.price);
    // calculate total price
    let totalPay = 0;
    for(let i = 0; i < prices.length; i++) {
        if(prices[i]) {
            totalPay += parseInt(prices[i] as string);
        }
    }
    return {logsCount, totalPay, logs};
}

export const getLogsByVehicleService = async ({vehicleId,accountId,page,limit} : {
    vehicleId : string,
    accountId : string,
    page : number,
    limit : number
}) => {
    const logs = await prisma.logs.findMany({
        skip: page * limit,
        take: limit,
        where : {
            vehicleId : vehicleId,
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
        },
        orderBy : {
            timeIn : "desc"
        }
    });
    const logsFull = await prisma.logs.findMany({
        where : {
            vehicleId : vehicleId,
            vehicle : {
                user : {
                    accountId : accountId
                }
            }
        },
        select: {
            logId: true,
            timeIn: true,
            price: true,
        },
        orderBy : {
            timeIn : "desc"
        }
    })
    const logsCount = logsFull.length;
    // get prices of logs
    const prices = logsFull.map(log => log.price);
    // calculate total price
    let totalPay = 0;
    for(let i = 0; i < prices.length; i++) {
        if(prices[i]) {
            totalPay += parseInt(prices[i] as string);
        }
    }
    return {logsCount, totalPay, logs};
}