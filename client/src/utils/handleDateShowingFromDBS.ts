function handleDateShowingFromDBS(time: string) {
    // create a new Date object with the original date string
    const originalDate = new Date(time);

    // create an array of weekday names
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dayOfWeek = daysOfWeek[originalDate.getDay()];
    const dayOfMonth = originalDate.getDate();
    // const year = originalDate.getFullYear();
    let hour = originalDate.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    const minutes = originalDate.getMinutes();

    const formattedDate = `${dayOfMonth} ${dayOfWeek} ${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return (formattedDate); // "4/27 Thursday"
}

export default handleDateShowingFromDBS