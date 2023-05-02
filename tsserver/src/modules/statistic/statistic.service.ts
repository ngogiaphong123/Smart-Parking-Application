import { now } from "moment-timezone";
import log from "../../utils/logger";
import prisma from "../../utils/prisma"

export const slotPieChartService = async () => {
    const total = await prisma.parkingSlot.count();
    const slotPieChart = await prisma.parkingSlot.groupBy({
        by: ['status'],
        _count: {
            status: true
        }
    })
    slotPieChart.forEach((item : any) => {
        item.percentage = (item._count.status / total) * 100;
        // rename _count to count
        item.count = item._count.status;
        delete item._count;
    });
    return slotPieChart;
}
export const customerPercentageService = async ({start} : {start : Date}, type : string) => {
    let startDate = new Date(start);
    let endDate = new Date(start);
    if(type == "day") {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    }
    else if(type == "week") {
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
    }
    else if(type == "month") {
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 30);
        endDate.setHours(23, 59, 59, 999);
    }
    else if(type = "total") {
        startDate = new Date(0);
        endDate = new Date();
    }
    const users = await prisma.user.findMany({
        where : {
            role : "customer"
        },
        select : {
            firstName : true,
            lastName : true,
            email : true,
            phone : true,
            accountId : true
        }
    })
    const logs = await prisma.logs.findMany({
        where : {
            timeIn : {
                gte : startDate,
                lte : endDate
            }
        }
    });
    const fullLogsPrice = logs.map((log) => log.price);
    let totalPrice = 0;
    for (let i = 0; i < fullLogsPrice.length; i++) {
        if(fullLogsPrice[i]) {
            totalPrice += parseInt(fullLogsPrice[i] as string);
        }
    }
    const result = [];
    for (let i = 0; i < users.length; i++) {
        const userLogs = await prisma.logs.findMany({
            where : {
                vehicle : {
                    ownerId : users[i].accountId
                },
                timeIn : {
                    gte : startDate,
                    lte : endDate
                }
            },
            select : {
                price : true,
                timeIn : true,
                timeOut : true
            }
        });
        if(userLogs.length === 0) continue;
        let userTotalPrice = 0;
        let totalTimes = 0;
        for(let j = 0; j < userLogs.length; j++) {
            if(userLogs[j].price) {
                userTotalPrice += parseInt(userLogs[j].price as string);
            }
            if(userLogs[j].timeOut != null) {
                // @ts-ignore
                totalTimes += (userLogs[j].timeOut.getTime() - userLogs[j].timeIn.getTime());
            }
        }
        totalTimes = Math.round(totalTimes / 1000);
        let hours = Math.floor(totalTimes / 3600);
        let minutes = Math.floor((totalTimes % 3600) / 60);
        let remainingSeconds = totalTimes % 60;
        const times = `${hours}h ${minutes}m ${remainingSeconds}s`;
        const percentage = (userTotalPrice / totalPrice) * 100;
        result.push({user : users[i], percentage , times ,totalPay : userTotalPrice, logsCount : userLogs.length});
    }
    // sort by percentage
    result.sort((a, b) => b.percentage - a.percentage);
    return result;
}
export const numLogsInDayService = async ({start} : {start : Date}, accountId : string) => {
    const numLogsPerHour = [];
    for (let i = 0; i < 24; i++) {
        const startHour = new Date(start.setHours(i));
        const endHour = new Date(start.setHours(i + 1));
        let numLogs;
        if (accountId != "") {
            numLogs = await prisma.logs.findMany({
                where : {
                    timeIn : {
                        gte : startHour,
                        lte : endHour
                    },
                    vehicle : {
                        ownerId : accountId
                    }
                }
            });
        }
        else {
            numLogs = await prisma.logs.findMany({
                where : {
                    timeIn : {
                        gte : startHour,
                        lte : endHour
                    }
                }
            });
        }
        numLogsPerHour.push({logsCount : numLogs.length , from : startHour, to : endHour, clockHour : i + 1});
    }
    return numLogsPerHour;
}

export const numLogsInWeekService = async ({start} : {start : Date}, accountId : string) => {
    const numLogsPerDay = [];
    for (let i = 0; i < 7; i++) {
        const temp = new Date(start);
        const startDay = new Date(temp.setDate(temp.getDate() + i));
        const endDay = new Date(temp.setDate(temp.getDate() + 1));
        let numLogs;
        if(accountId != "") {
            numLogs = await prisma.logs.findMany({
                where : {
                    timeIn : {
                        gte : startDay,
                        lte : endDay
                    },
                    vehicle : {
                        ownerId : accountId
                    }
                }
            });
        }
        else {
            numLogs = await prisma.logs.findMany({
                where : {
                    timeIn : {
                        gte : startDay,
                        lte : endDay
                    }
                }
            });
        }
        numLogsPerDay.push({logsCount : numLogs.length , from : startDay, to : endDay, day : i + 1});
    }
    return numLogsPerDay;
}

export const numLogsInMonthService = async ({start} : {start : Date}, accountId : string) => {
    const numLogsPerWeek = [];
    for (let i = 0; i < 4; i++) {
        const temp = new Date(start);
        const startWeek = new Date(temp.setDate(temp.getDate() + i * 7));
        const endWeek = new Date(temp.setDate(temp.getDate() + 7));
        let numLogs;
        if (accountId != "") {
            numLogs = await prisma.logs.findMany({
                where : {
                    timeIn : {
                        gte : startWeek,
                        lte : endWeek
                    },
                    vehicle : {
                        ownerId : accountId
                    }
                }
            });
        }
        else {
            numLogs = await prisma.logs.findMany({
                where : {
                    timeIn : {
                        gte : startWeek,
                        lte : endWeek
                    }
                }
            });
        }
        numLogsPerWeek.push({logsCount : numLogs.length , from : startWeek, to : endWeek, week : i + 1});
    }
    return numLogsPerWeek;
};
  
export const logVehicleService = async ({start} : {start : Date}, accountId : string, type : string) => {
    let startDate = new Date(start);
    let endDate = new Date(start);
    if(type == "day") {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    }
    else if(type == "week") {
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
    }
    else if(type == "month") {
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 30);
        endDate.setHours(23, 59, 59, 999);
    }
    else if(type == "total") {
        startDate = new Date(0);
        endDate = new Date();
    }
    const result = await prisma.logs.groupBy({
        by: ['vehicleId'],
        _count: {
            vehicleId: true
        },
        where: {
            timeIn: {
                gte: startDate,
                lte: endDate
            },
            vehicle: {
                ownerId: accountId
            }
        },
        orderBy : {
            _count : {
                vehicleId : "desc"
            }
        }
    })
    const logVehicle = [];
    for (let i = 0; i < result.length; i++) {
        if(result[i]._count.vehicleId != 0) {
            const vehicle = await prisma.vehicle.findUnique({
                where : {
                    vehicleId : result[i].vehicleId,
                },
                select : {
                    vehicleId : true,
                    model : true,
                    numberPlate : true,
                    genre : true,
                }
            })
            const logs = await prisma.logs.findMany({
                where : {
                    vehicleId : result[i].vehicleId,
                    timeIn: {
                        gte: startDate,
                        lte: endDate
                    },
                },
                select : {
                    timeIn : true,
                    timeOut : true,
                    price : true,
                }
            });
            const prices = logs.map(log => log.price);
            let totalPay = 0;
            let totalTimes = 0;
            for(let j = 0; j < prices.length; j++) {
                if(prices[j]) {
                    totalPay += parseInt(prices[j] as string);
                }
                if(logs[j].timeOut) {
                    // @ts-ignore
                    totalTimes += (logs[j].timeOut.getTime() - logs[j].timeIn.getTime());
                }
            }
            totalTimes = Math.round(totalTimes / 1000);
            let hours = Math.floor(totalTimes / 3600);
            let minutes = Math.floor((totalTimes % 3600) / 60);
            let remainingSeconds = totalTimes % 60;
            const times = `${hours}h ${minutes}m ${remainingSeconds}s`;
            logVehicle.push({vehicle, totalPay, times, logsCount : result[i]._count.vehicleId});
        }
    }
    // calculate percentage of total pay
    const totalPay = logVehicle.reduce((total : number, item : any) => {
        return total + item.totalPay;
    }, 0);
    logVehicle.forEach((item : any) => {
        item.percentage = (item.totalPay / totalPay) * 100;
    });
    // sort by total pay
    logVehicle.sort((a : any, b : any) => {
        return b.totalPay - a.totalPay;
    });
    return logVehicle;
}