import { memo, useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'highcharts/css/highcharts.css';
import { useDispatch } from 'react-redux'
import { getLightRecord } from '../../../redux/slices/LightSensorSlice'


function LightChart() {
    const dispatch = useDispatch<any>();
    const [lightData, setLightData] = useState([
        // Add more temperature data points here
    ]);
    useEffect(() => {
        const handleLight = setInterval(() => {

            dispatch(getLightRecord({ page: 0, limit: 10 }))
                .then((res: any) => {
                    // reverse res.payload.data
                    let dataTest = JSON.parse(JSON.stringify(res.payload.data));
                    dataTest.reverse();
                    // loading timestamp and temperature from the response to temperatureData
                    const data = dataTest.map((item: any) => {
                        let datetimeString = item.timestamp;
                        let parts = datetimeString.split('T');
                        let date = parts[0].split('-').reverse().join('/');
                        let time = parts[1];
                        let pos = date.lastIndexOf('/');
                        date = date.substring(0, pos);
                        let formattedString = date + ' ' + time;
                        return { time: formattedString, light: item.light }
                    })
                    setLightData(data)
                })
        }, 1000)

        return () => {
            clearInterval(handleLight)
        }
    }, []);
    return (
        <>
            <ResponsiveContainer width="100%" aspect={3} min-width="300px" min-height="200px">
                <LineChart width={600} height={300} data={lightData} min-width="300px" min-height="200px">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="light" stroke="orange" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default memo(LightChart);