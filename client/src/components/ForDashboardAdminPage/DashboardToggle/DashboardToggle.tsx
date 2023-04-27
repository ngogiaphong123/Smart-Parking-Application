import {
    memo, useState, useEffect
} from 'react'
import temperature from '../../../assets/icon/temperature.svg'
import temperature_off from '../../../assets/icon/temperature_off.svg'
import water_off from '../../../assets/icon/water_off.svg'
import water from '../../../assets/icon/water.svg'
import light_off from '../../../assets/icon/light_off.svg'
import light from '../../../assets/icon/light.svg'
import music_off from '../../../assets/icon/music_off.svg'
import music from '../../../assets/icon/music.svg'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { FanDeviceStore, ResponsiveStore } from '../../../redux/selectors'
import { getFanStatus, manageFan } from '../../../redux/slices/FanDeviceSlice'
import { fanSocketStatus, fanSocketControl } from '../../../redux/slices/FanDeviceSlice'
import socket from '../../../utils/socket'
import { v4 as uuidv4 } from 'uuid'
import { Draggable } from 'react-beautiful-dnd'
const DashboardToggle = ({ kind, index, overHeating }: { overHeating?:any, kind: string, index: number }) => {
    const dispatch = useDispatch<any>();
    const [receiveData, setReceiveData] = useState(false)
    const isResponsive = useSelector(ResponsiveStore).data
    // call first
    useEffect(() => {
        if (kind === "temperature") {
            socket.on(fanSocketStatus, (res: any) => {
                if (res.data[0].status === "0") {
                    setIsOn(false)
                }
                else {
                    setIsOn(true)
                }
            })
            return () => {
                socket.off(fanSocketStatus)
            }
        }
    }, [])
    useEffect(() => {
        if (kind === "temperature") {
            socket.on(fanSocketControl, (res: any) => {
                if (res.data[0].status === "0") {
                    setIsOn(false)
                }
                else {
                    setIsOn(true)
                }
            })
            return () => {
                socket.off(fanSocketControl)
            }
        }
    }, [])
    useEffect(() => {
        socket.emit(fanSocketStatus, { page: 0, limit: 1 })
    }, [])

    const [isOn, setIsOn] = useState(false);
    const handleToggle = () => {
        if (!isOn)
            socket.emit(fanSocketControl, { value: "1" })
        else
            socket.emit(fanSocketControl, { value: "0" })
    }
    
    useEffect(()=>{
        if(overHeating && !isOn){
            handleToggle()
        }
    }, [overHeating&&isOn])

    // chill
    const [waterVolumne, setWaterVolumne] = useState(100)
    // useEffect(() => {
    //     // water down every 1s if isOn is true
    //     if (isOn && kind === "water") {
    //         const interval = setInterval(() => {
    //             setWaterVolumne(prev => prev - 1)
    //         }
    //             , 1000)
    //         return () => clearInterval(interval)
    //     }
    // }, [isOn])
    return (<>
        <Draggable key={index} draggableId={uuidv4()} index={index} >
            {
                (provided: any, snapshot: any) => {
                    if (snapshot.isDragging) {
                        const offset = isResponsive?{ x: 0, y: 70 }:{ x: 280, y: 100 }          // your fixed container left/top position
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
                            className={clsx("draggable w-32 h-32 md:w-44 md:h-40 p-4 rounded-2xl border-1 border-gray drop-shadow-lg", {
                                "bg-tempToggleDashboardColor": kind === "temperature" && isOn,
                                "bg-[#3ACBE9]": kind === "water" && isOn,
                                "bg-[#FF9060]": kind === "light&music" && isOn,
                                "bg-white": !isOn
                            })}>
                            <div className="w-full flex justify-between items-center">
                                <span className={clsx("font-semibold text-super-small", {
                                    "text-white": isOn,
                                    "text-gray-500": !isOn
                                })}>{isOn ? "ON" : "OFF"}</span>
                                <label className="relative inline-flex items-center cursor-pointer ">
                                    <input onClick={handleToggle} type="checkbox" value="" className="sr-only peer" checked={isOn} />
                                    <div className={clsx("w-9 h-5 transition duration-200 ease-in-out border-1 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]  after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 ", {
                                        "peer-checked:bg-white": isOn,
                                        "peer-checked:bg-[#F5F5F5]": !isOn,
                                        "after:bg-tempToggleSwitchColor": kind === "temperature" && isOn,
                                        "after:bg-[#3ACBE9]": kind === "water" && isOn,
                                        "after:bg-[#F2946D]": kind === "light&music" && isOn,
                                        "after:bg-white": !isOn
                                    })}></div>
                                </label>
                            </div>
                            <div className="w-full mt-2 md:mt-8 flex gap-2">
                                <img src={kind === "temperature" ? (isOn ? temperature : temperature_off)
                                    : kind === "water" ? (isOn ? water : water_off)
                                        : kind === "light&music" ? (isOn ? light : light_off) : ""} className={isOn ? "text-white" : "text-gray-500"} alt="" />
                                <img src={kind === "light&music" ? (isOn ? music : music_off) : ""} className={isOn ? "text-white" : "text-gray-500"} alt="" />
                            </div>
                            <div className="w-full md:mt-4">
                                <span className={clsx(" text-super-small font-semibold", {
                                    "text-white": isOn,
                                    "text-gray-500": !isOn
                                })}>
                                    {
                                        kind === "temperature" ?
                                            "Temperature (Fan)" :
                                            kind === "water" ? `Water (Pump) ${waterVolumne}%` :
                                                kind === "light&music" ? "Light & Music" : ""
                                    }
                                </span>
                            </div>
                        </div>
                    )
                }
            }
        </Draggable>
    </>);
}

export default memo(DashboardToggle);