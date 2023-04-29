import { memo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import DashboardToggle from '../../components/ForDashboardAdminPage/DashboardToggle/DashboardToggle';
import TemperatureChart from '../../components/ForDashboardAdminPage/TemperatureChart/TemperatureChart';
import LightChart from '../../components/ForDashboardAdminPage/LightChart/LightChart';
import { pageMotionTime } from '../../configs';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid'

function DashboardAdminPage() {
    const [indexArray, setIndexArray] = useState<any>([1, 2, 3])
    const [indexArray2, setIndexArray2] = useState<any>([1, 2])
    const [overHeating, setOverHeating] = useState(false)
    const [dragDropSignal, setDragDropSignal] = useState({ signal: false, result: false })
    const [dragDropSignal2, setDragDropSignal2] = useState({ signal: false, result: false })
    const handleDragEnd = (result: any) => {
        setDragDropSignal((prev: any) => ({
            signal: !prev.signal,
            result: result
        }))
    }
    const handleDragEnd2 = (result: any) => {
        setDragDropSignal2((prev: any) => ({
            signal: !prev.signal,
            result: result
        }))
    }
    useEffect(() => {
        if (dragDropSignal.result) {
            // @ts-ignore
            const { destination, source } = dragDropSignal.result
            if (destination.index !== source.index) {
                setIndexArray((prev: any) => {
                    const updatedArray = [...prev];
                    const [removedItem] = updatedArray.splice(source.index - 1, 1);
                    updatedArray.splice(destination.index - 1, 0, removedItem);
                    return updatedArray;
                })
            }
        }
    }, [dragDropSignal.signal])

    useEffect(() => {
        if (dragDropSignal2.result) {
            // @ts-ignore
            const { destination, source } = dragDropSignal2.result
            if (destination.index !== source.index) {
                setIndexArray2((prev: any) => {
                    const updatedArray = [...prev];
                    const [removedItem] = updatedArray.splice(source.index - 1, 1);
                    updatedArray.splice(destination.index - 1, 0, removedItem);
                    return updatedArray;
                })
            }
        }
    }, [dragDropSignal2.signal])
    return (<>
        <motion.div
            initial={{
                opacity: 0,
                y: "10%"
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: "10%"
            }}
            transition={{
                duration: pageMotionTime
            }}

            className="w-full h-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden">
            <div className="w-full h-8 flex justify-between items-center " >
                <span className="text-md text-title-inPage font-semibold capitalize">
                    car parking's dashboard
                </span>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={"place to drop"} direction={"horizontal"} type="row">
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-full flex justify-start items-center gap-8 py-6 flex-wrap md:flex-none " >
                                {
                                    indexArray.map((value: number, index: number) => {
                                        if (value === 1)
                                            return <DashboardToggle index={index + 1} kind='temperature' key={"toggle1"} overHeating={overHeating} />
                                        else if (value === 2)
                                            return <DashboardToggle index={index + 1} kind='water' key={"toggle2"} />
                                        else if (value === 3)
                                            return <DashboardToggle index={index + 1} kind='light&music' key={"toggle3"} />
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>


            <DragDropContext onDragEnd={handleDragEnd2}>
                <Droppable droppableId={"place to drop2"} direction={"vertical"} type="column">
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-full h-fit">
                                {
                                    indexArray2.map((value: number, index: number) => {
                                        if (value === 1)
                                            return (<div className="w-full h-fit" key={index}>
                                                <TemperatureChart overHeating={overHeating} key={index} setOverHeating={setOverHeating} index={index} />
                                            </div>)
                                        else if (value === 2)
                                            return (<div className="w-full h-fit" key={index}>
                                                <LightChart key={index} index={index} />
                                            </div>)
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>

        </motion.div >
    </>);
}

export default memo(DashboardAdminPage);