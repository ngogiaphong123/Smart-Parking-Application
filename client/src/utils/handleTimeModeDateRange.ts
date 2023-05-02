function handleTimeModeDateRange(timeMode: "nextDayDate" | "nextWeekDate" | "nextMonthDate", date: string) {
    const today = new Date(date);
    if (timeMode === "nextDayDate") {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        return nextDay.toISOString();
    }
    else if (timeMode === "nextWeekDate") {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return nextWeek.toISOString();
    }
    else {
        const nextMonth = new Date(today);
        const currentMonth = today.getMonth();
        nextMonth.setMonth(currentMonth + 1);
        if (nextMonth.getMonth() !== (currentMonth + 1) % 12) {
            // This means that the date is the last day of the month, and setting the month to the next month resulted in an invalid date.
            // In this case, we set the date to the last day of the next month.
            nextMonth.setMonth(currentMonth + 2, 0);
        }
        return nextMonth.toISOString();
    }
}

export default handleTimeModeDateRange