import { memo, useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'highcharts/css/highcharts.css';

function TemperatureChart({tempToggleRef}:{tempToggleRef:any}) {
    const [temperatureData, setTemperatureData] = useState([
        { time: '00:00', temperature: 22 },
        // Add more temperature data points here
    ]);
    console.log(tempToggleRef.current?.handleGetState())
    const [newTemp, setNewTemp] = useState([
        { time: '00:00', temperature: 22 },
        { time: '00:30', temperature: 23 },
        { time: '01:00', temperature: 24 },
        { time: '01:30', temperature: 25 },
        { time: '02:00', temperature: 24 },
        { time: '02:30', temperature: 23 },
        { time: '03:00', temperature: 22 },
        { time: '03:30', temperature: 21 },
        { time: '04:00', temperature: 20 },
        { time: '04:30', temperature: 25 },
        { time: '05:00', temperature: 30 },
        { time: '05:30', temperature: 40 },
        { time: '06:00', temperature: 50 },
        { time: '06:30', temperature: 60 },
        { time: '07:00', temperature: 80 },
        { time: '07:30', temperature: 13 },
        { time: '08:00', temperature: 12 },
        { time: '08:30', temperature: 11 },
        { time: '09:00', temperature: 10 },
        { time: '09:30', temperature: 11 },
        { time: '10:00', temperature: 12 },
        { time: '10:30', temperature: 13 },
        { time: '11:00', temperature: 14 },
        { time: '11:30', temperature: 15 },
        { time: '12:00', temperature: 16 },
        { time: '12:30', temperature: 17 },
        { time: '13:00', temperature: 18 },
        { time: '13:30', temperature: 19 },
        { time: '14:00', temperature: 20 },
        { time: '14:30', temperature: 21 },
        { time: '15:00', temperature: 22 },
        { time: '15:30', temperature: 23 },
        { time: '16:00', temperature: 24 },
        { time: '16:30', temperature: 25 },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            // add first temperature from newTemp array to the end of temperature array and shift the first element of newTemp array
            setTemperatureData((prev) => {
                // if fan is on, then minus 20 to temperature
                if (tempToggleRef.current?.handleGetState()) {
                    const newTempData = [...prev, { time: newTemp[0].time, temperature: newTemp[0].temperature - 20 }];
                    newTemp.shift();
                    return newTempData;
                }
                else
                {
                    const newTempData = [...prev, newTemp[0]];
                    newTemp.shift();
                    return newTempData;
                }


            })
            // newTemp out of array then clear
            if (newTemp.length === 0) {
                clearInterval(interval);
            }
        }, 1000);


        return () => clearInterval(interval);
    }, []);

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <LineChart width={600} height={300} data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#F2946D" />
            </LineChart>
        </ResponsiveContainer>);
}

export default memo(TemperatureChart);