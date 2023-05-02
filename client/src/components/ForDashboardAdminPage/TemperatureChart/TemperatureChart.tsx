import { memo, useState, useEffect, SetStateAction } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import 'highcharts/css/highcharts.css';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { temperatureChannelLinkName } from '../../../redux/slices/TemperatureSensorSlice'
import socket from '../../../utils/socket';
import SmallNotificationSlice from '../../../redux/slices/modals/SmallNotificationSlice';
import { v4 as uuidv4 } from 'uuid'
import { Draggable } from 'react-beautiful-dnd';
import { ResponsiveStore } from '../../../redux/selectors';
import clsx from 'clsx';
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

function TemperatureChart({ overHeating, setOverHeating, index }: { overHeating: any, index: any; setOverHeating: any }) {
    const dispatch = useDispatch<any>();
    const [temperatureData, setTemperatureData] = useState<any>([]);
    const [receiveData, setReceiveData] = useState<any>(false);
    const isResponsive = useSelector(ResponsiveStore).data
    useEffect(() => {
        socket.on(temperatureChannelLinkName, (res: { status: string, message: string, data: mainData }) => {
            if (res.status === "Success") {
                res.data.reverse();
                const data = res.data.map((item: smallData) => {
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
                if (newData.length > 10) {
                    newData.shift();
                }
                setTemperatureData(newData)
                setReceiveData((prev: boolean) => !prev)
            }
            else {
                console.log(res.message)
                socket.off(temperatureChannelLinkName)
            }
        })
        return () => {
            socket.off(temperatureChannelLinkName)
        }
    }, [receiveData]);
    useEffect(() => {
        socket.emit(temperatureChannelLinkName, { page: 0, limit: 10 })
    }, [])
    useEffect(() => {
        if (temperatureData[temperatureData.length - 1] && temperatureData[temperatureData.length - 1].temperature > 33) {
            dispatch(SmallNotificationSlice.actions.handleOpen({ type: "error", content: "Temperature is too high" }))
            setOverHeating(true)
        }
        else {
            setOverHeating(false)
        }
    }, [temperatureData[temperatureData.length - 1]])
    return (
        <Draggable key={index} draggableId={uuidv4()} index={index} >
            {
                (provided: any, snapshot: any) => {
                    if (snapshot.isDragging) {
                        const offset = isResponsive ? { x: 0, y: 70 } : { x: 280, y: 100 }          // your fixed container left/top position
                        const x = provided.draggableProps.style.left - offset.x;
                        const y = provided.draggableProps.style.top - offset.y;
                        provided.draggableProps.style.left = x;
                        provided.draggableProps.style.top = y;
                    }
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full flex justify-between items-center my-8 pr-14 flex-col">
                            <div className="w-full flex justify-between items-center " >
                                <span className="text-md text-title-inPage font-semibold capitalize">
                                    Car Parking Temperature
                                </span>
                            </div>
                            <div className="w-full flex justify-between items-center mt-4 mb-6" >
                                <span className={clsx("text-md  font-semibold capitalize pr-8 inline", {
                                    "text-[#008000]": !overHeating,
                                    "text-red-500": overHeating
                                })}>
                                    Fire warning - {overHeating ? "Need to cool down now" : "Safe"}
                                </span>
                            </div>
                            <ResponsiveContainer width="100%" aspect={2} min-width="300px" min-height="200px">
                                <LineChart width={600} height={300} data={temperatureData} min-width="300px" min-height="200px" >
                                    <CartesianGrid strokeDasharray="6 6" />
                                    <XAxis dataKey="time">
                                    </XAxis>
                                    <YAxis domain={[30, 40]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="temperature" stroke={(temperatureData[temperatureData.length - 1] && temperatureData[temperatureData.length - 1].temperature > 33) ? "red" : "green"} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )
                }
            }
        </Draggable>
    )
}

export default memo(TemperatureChart);