import { memo, useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'highcharts/css/highcharts.css';
import { useDispatch } from 'react-redux'
import { lightChannelLinkName } from '../../../redux/slices/LightSensorSlice'
import socket from '../../../utils/socket';
import { v4 as uuidv4 } from 'uuid'
import { ResponsiveStore } from '../../../redux/selectors';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

type mainData = [{
    createdAt: string,
    lux: number,
    updatedAt: string,
    recordId: string,
    unit: string,
    timestamp: string,
}]
type smallData = {
    createdAt: string,
    lux: number,
    updatedAt: string,
    recordId: string,
    unit: string,
    timestamp: string,
}

function LightChart({index}:{index:number}) {
    const dispatch = useDispatch<any>();
    const [lightData, setLightData] = useState<any>([
    ]);
    const isResponsive = useSelector(ResponsiveStore).data
    const [receiveData, setReceiveData] = useState(false)
    useEffect(() => {
        socket.on(lightChannelLinkName, (res: { status: string, message: string, data: mainData }) => {
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
                    return { time: formattedString, lux: item.lux }
                })
                const newData = [...lightData, ...data]
                if (newData.length > 10) {
                    newData.shift();
                }
                setLightData(newData)
                setReceiveData((prev: boolean) => !prev)
            }
            else {
                console.log(res.message)
                socket.off(lightChannelLinkName)
            }
        })
        return () => {
            socket.off(lightChannelLinkName)
        }
    }, [receiveData]);

    useEffect(() => {
        socket.emit(lightChannelLinkName, {
            "page": 0,
            "limit": 10
        })
    }, [])

    return (<Draggable key={index} draggableId={uuidv4()} index={index} >
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
                        className="w-full h-full">
                        <div className="w-full flex justify-between items-center " >
                            <span className="text-md text-title-inPage font-semibold capitalize">
                                Car Parking Light
                            </span>
                        </div>

                        <div className="w-full flex justify-between items-center my-8 pr-14" >
                            <ResponsiveContainer width="100%" aspect={2} min-width="300px" min-height="300px">
                                <LineChart width={600} height={300} data={lightData} min-width="300px" min-height="200px">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="lux" stroke="orange" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        }
    </Draggable>
    )
}

export default memo(LightChart);