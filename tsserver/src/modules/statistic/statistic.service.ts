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