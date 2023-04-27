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

export const numLogsInDayService = async ({day} : {day : Date}) => {
    // 2023-04-26
    // start : 2023-04-26 00:00:00
    // end : 2023-04-26 23:59:59
    const start = new Date(day);
    const end = new Date(day);
    // create array of num logs per hour to draw bar chart
    const numLogsPerHour = [];
    for (let i = 0; i < 24; i++) {
        const startHour = new Date(start.setHours(i));
        const endHour = new Date(end.setHours(i + 1));
        const numLogs = await prisma.logs.findMany({
            where : {
                timeIn : {
                    gte : startHour,
                    lte : endHour
                }
            }
        });
        numLogsPerHour.push({logs : numLogs,totalRecords : numLogs.length , start : startHour, end : endHour, clockHour : i});
    }
    return numLogsPerHour;
}