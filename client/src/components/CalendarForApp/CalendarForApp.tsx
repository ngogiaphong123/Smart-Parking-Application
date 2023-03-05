import { memo, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion'
function CalendarForApp() {
    const [date, setDate] = useState(new Date());
    // get day month year
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                key="calendar"
            >
                <Calendar
                    value={date}
                    onChange={setDate}
                />
            </motion.div>
        </>);
}

export default memo(CalendarForApp);