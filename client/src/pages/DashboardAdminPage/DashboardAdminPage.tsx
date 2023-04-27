import { memo, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DashboardToggle from '../../components/ForDashboardAdminPage/DashboardToggle/DashboardToggle';
import TemperatureChart from '../../components/ForDashboardAdminPage/TemperatureChart/TemperatureChart';
import LightChart from '../../components/ForDashboardAdminPage/LightChart/LightChart';
import { pageMotionTime } from '../../configs';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function DashboardAdminPage() {
    const tempToggleRef = useRef<any>(null)
    const [indexArray, setIndexArray] = useState<any>([1, 2, 3])
    const [dragDropSignal, setDragDropSignal] = useState({ signal: false, result: false })
    const handleDragEnd = (result: any) => {
        setDragDropSignal((prev: any) => ({
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
                    const [removedItem] = updatedArray.splice(source.index-1, 1);
                    updatedArray.splice(destination.index-1, 0, removedItem);
                    return updatedArray;
                })
            }
        }
    }, [dragDropSignal.signal])
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
                                    indexArray.map((value: number, index:number) => {
                                        if (value === 1)
                                            return <DashboardToggle index={index+1} ref={tempToggleRef} kind='temperature' key={"toggle1"} />
                                        else if (value === 2)
                                            return <DashboardToggle index={index+1} kind='water' key={"toggle2"} />
                                        else if (value === 3)
                                            return <DashboardToggle index={index+1} kind='light&music' key={"toggle3"} />
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
            <div className="w-full flex justify-between items-center " >
                <span className="text-md text-title-inPage font-semibold capitalize">
                    Car Parking Temperature
                </span>
            </div>

            <div className="w-full flex justify-between items-center mt-4" >
                <span className="text-md text-[#008000] font-semibold capitalize pr-8 inline">
                    Fire warning - Safe
                </span>
                {/* <span className="text-md text-yellow-300 font-semibold capitalize pr-8 inline underline">
                Fire warning - Need Fan
                </span>
                <span className="text-md text-[red] font-semibold capitalize pr-8 inline underline decoration-double">
                Fire warning - Danger!
                </span> */}
            </div>
            <div className="w-full flex justify-between items-center my-8 pr-14" >
                <TemperatureChart tempToggleRef={tempToggleRef} />
            </div>
            <div className="w-full flex justify-between items-center " >
                <span className="text-md text-title-inPage font-semibold capitalize">
                    Car Parking Light
                </span>
            </div>

            <div className="w-full flex justify-between items-center my-8 pr-14" >
                {/* <LightChart/> */}
            </div>
        </motion.div>
    </>);
}

export default memo(DashboardAdminPage);