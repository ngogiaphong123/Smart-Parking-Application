import { memo, useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import 'highcharts/css/highcharts.css';
import { useDispatch } from 'react-redux'
import { getTemperatureRecord } from '../../redux/slices/TemperatureSensorSlice'
import {io} from 'socket.io-client'
import serverUrl from '../../redux/urls/urls'
const socket = io(serverUrl)


function TemperatureChart({ tempToggleRef }: { tempToggleRef: any }) {
    const dispatch = useDispatch<any>();
    const [temperatureData, setTemperatureData] = useState([
        // Add more temperature data points here
    ]);
    useEffect(() => {
        socket.on("temperature-channel",(res:[{
            createdAt: string,
            temperature: number,
            updatedAt: string,
            recordId: string,
            unit: string,
            timestamp: string,
        }])=>{
                res.reverse();
        //             // loading timestamp and temperature from the response to temperatureData
        //             const data = dataTest.map((item: any) => {
        //                 let datetimeString = item.timestamp;
        //                 let parts = datetimeString.split('T');
        //                 let date = parts[0].split('-').reverse().join('/');
        //                 let time = parts[1];
        //                 let pos = date.lastIndexOf('/');
        //                 date = date.substring(0, pos);
        //                 let formattedString = date + ' ' + time;
        //                 return { time: formattedString, temperature: item.temperature }
        })
        const page:number = 0;
        const limit:number = 10

        // const handleTemperature = setInterval(() => {
        //     dispatch(getTemperatureRecord({ page: 0, limit: 10 }))
        //         .then((res: any) => {
        //             // reverse res.payload.data
        //             let dataTest = JSON.parse(JSON.stringify(res.payload.data));
        //             dataTest.reverse();
        //             // loading timestamp and temperature from the response to temperatureData
        //             const data = dataTest.map((item: any) => {
        //                 let datetimeString = item.timestamp;
        //                 let parts = datetimeString.split('T');
        //                 let date = parts[0].split('-').reverse().join('/');
        //                 let time = parts[1];
        //                 let pos = date.lastIndexOf('/');
        //                 date = date.substring(0, pos);
        //                 let formattedString = date + ' ' + time;
        //                 return { time: formattedString, temperature: item.temperature }
        //             })
        //             setTemperatureData(data)
        //         })
        // }, 5000)
        // return () => {
        //     clearInterval(handleTemperature)
        // }
    }, []);
    return (
        <>
            <ResponsiveContainer width="100%" aspect={2} min-width="300px" min-height="200px">
                <LineChart width={600} height={300} data={temperatureData} min-width="300px" min-height="200px">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time">
                    </XAxis>
                    <YAxis domain={[30, 40]}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="red" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default memo(TemperatureChart);