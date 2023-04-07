import { memo, useRef } from 'react'
import { motion } from 'framer-motion'
import DashboardToggle from '../../components/DashboardToggle/DashboardToggle';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import LightChart from '../../components/LightChart/LightChart';

function DashboardAdmin() {
    const tempToggleRef = useRef<any>(null) 
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
                duration: 1
            }}

            className="w-full h-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden">
            <div className="w-full h-8 flex justify-between items-center " >
                <span className="text-md text-title-inPage font-semibold capitalize">
                    car parking's dashboard
                </span>
            </div>
            <div className="w-full flex justify-start items-center gap-8 py-6 flex-wrap md:flex-none " >
                <DashboardToggle ref={tempToggleRef} kind='temperature'/>
                <DashboardToggle kind='water'/>
                <DashboardToggle kind='light&music'/>
            </div>
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
                <TemperatureChart tempToggleRef={tempToggleRef}/>
            </div>
            <div className="w-full flex justify-between items-center " >
                <span className="text-md text-title-inPage font-semibold capitalize">
                Car Parking Light
                </span>
            </div>
            
            <div className="w-full flex justify-between items-center my-8 pr-14" >
                <LightChart/>
            </div>
        </motion.div>
    </>);
}

export default memo(DashboardAdmin);