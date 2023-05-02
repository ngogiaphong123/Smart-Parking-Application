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
        numLogsPerHour.push({totalRecords : numLogs.length , from : startHour, to : endHour, clockHour : i + 1});
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
        numLogsPerDay.push({totalRecords : numLogs.length , from : startDay, to : endDay, day : i + 1});
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
        numLogsPerWeek.push({totalRecords : numLogs.length , from : startWeek, to : endWeek, week : i + 1});
    }
    return numLogsPerWeek;
};