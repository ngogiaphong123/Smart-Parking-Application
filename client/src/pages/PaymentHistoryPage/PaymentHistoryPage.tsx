import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { pageMotionTime } from '../../configs';
import clsx from 'clsx';
import CustomerVehicleCard from '../../components/ForHomeAndParkingPage/CustomerVehicleCard/CustomerVehicleCard';
import CalendarForApp from '../../components/CalendarForApp/CalendarForApp';

function PaymentHistoryPage() {
    const [paidState, setPaidState] = useState<any>("paid");
    return (<motion.div 
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
    className="flex h-full w-full flex-col-reverse lg:flex-row lg:justify-between">
        <div
            className="h-full w-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden"
        >
            <div className="w-full h-8 flex justify-between items-center">
                <span className="text-md text-title-inPage font-semibold capitalize">
                    Payment history
                </span>
            </div>
            <div className="w-full h-8 flex justify-start items-center">
                <span onClick={() => { setPaidState("paid") }} className={clsx("cursor-pointer text-md capitalize", {
                    "text-title-inPage font-normal": paidState === "paid",
                    "text-gray-400 font-thin": paidState === "unpaid"
                })}>Paid</span>/
                <span onClick={() => { setPaidState("unpaid") }} className={clsx("pl-1 cursor-pointer text-md capitalize", {
                    "text-title-inPage font-normal": paidState === "unpaid",
                    "text-gray-400 font-thin": paidState === "paid"
                })}> unpaid</span>
            </div>
            <div className="w-full h-8 flex justify-start items-center">
                <span className="font-bold text-super-small">Results: 8</span>
            </div>
            <div className="w-full min-h-0 flex flex-col gap-2 max-h-[600px] overflow-auto p-4">
                <CustomerVehicleCard type="paid" />
                <CustomerVehicleCard type="paid" />
                <CustomerVehicleCard type="paid" />
                <CustomerVehicleCard type="paid" />
                <CustomerVehicleCard type="paid" />
                <CustomerVehicleCard type="paid" />
            </div>
        </div>
        <div
            className="h-full min-w-[370px] mb-4 drop-shadow-xl flex overflow-hidden justify-center"
        >
            <CalendarForApp></CalendarForApp>
        </div>
    </motion.div>);
}

export default memo(PaymentHistoryPage);