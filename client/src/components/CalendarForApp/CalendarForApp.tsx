import { memo, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./calendar.css"

function CalendarForApp() {
    const [date, setDate] = useState(new Date());
    // get day month year
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
        <>
            <Calendar
                value={date}
                onChange={setDate}
            />
        </>);
}

export default memo(CalendarForApp);