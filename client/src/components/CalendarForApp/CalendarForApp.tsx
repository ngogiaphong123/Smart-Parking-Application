import { memo, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./calendar.css"

function CalendarForApp({ date, setDate }: { date?: any, setDate?: any }) {
    // get day month year
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    return (
        <>
            <Calendar
                // defaultValue={new Date()}
                onChange={(e: any) => {
                    const date = new Date(e);
                    date.setHours(date.getHours() + 7);
                    const startOfDay = date
                    const endOfDay = new Date(startOfDay.getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000);
                    setDate({
                        start: startOfDay.toISOString(),
                        end: endOfDay.toISOString()
                    })
                }}
            />
        </>);
}

export default memo(CalendarForApp);