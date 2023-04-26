import { memo, useState, useEffect, SetStateAction } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import 'highcharts/css/highcharts.css';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {temperatureChannelLinkName} from '../../../redux/slices/TemperatureSensorSlice'
import socket from '../../../utils/socket';
type mainData = [{
    createdAt: string,
    temperature: number,
    updatedAt: string,
    recordId: string,
    unit: string,
    timestamp: string,
}]
type smallData = {
    createdAt: string,
    temperature: number,
    updatedAt: string,
    recordId: string,
    unit: string,
    timestamp: string,
}

function TemperatureChart({ tempToggleRef }: { tempToggleRef: any }) {
    const dispatch = useDispatch<any>();
    const [temperatureData, setTemperatureData] = useState<any>([]);
    const [receiveData, setReceiveData] = useState<any>(false);
    useEffect(() => {
        socket.on(temperatureChannelLinkName, (res: mainData) => {
            res.reverse();
            const data = res.map((item: smallData) => {
                const originalDateStr = item.timestamp;
                const originalDate = new Date(originalDateStr);
                const newDate = new Date(originalDate);
                newDate.setHours(newDate.getHours() + 7);
                const newDateStr = newDate.toISOString();

                let datetimeString = newDateStr;
                let parts = datetimeString.split('T');
                let date = parts[0].split('-').reverse().join('/');
                let time = parts[1];
                time = time.substring(0, time.length - 5);
                let pos = date.lastIndexOf('/');
                date = date.substring(0, pos);
                let formattedString = date + ' ' + time;
                return { time: formattedString, temperature: item.temperature }
            })
            const newData = [...temperatureData, ...data]
            if(newData.length>10)
            {
                newData.shift();
            }
            setTemperatureData(newData)
            setReceiveData((prev:boolean)=>!prev)
        })
        return () => {
            socket.off(temperatureChannelLinkName)
        }
    }, [receiveData]);
    useEffect(()=>{
        socket.emit(temperatureChannelLinkName, { page: 0, limit: 10 })
    },[])
    return (
        <>
            <ResponsiveContainer width="100%" aspect={2} min-width="300px" min-height="200px">
                <LineChart width={600} height={300} data={temperatureData} min-width="300px" min-height="200px">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time">
                    </XAxis>
                    <YAxis domain={[30, 40]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="red" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default memo(TemperatureChart);