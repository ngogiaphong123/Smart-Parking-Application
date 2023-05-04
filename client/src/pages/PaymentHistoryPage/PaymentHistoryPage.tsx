import { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { pageMotionTime } from '../../configs';
import clsx from 'clsx';
import CustomerVehicleCard from '../../components/ForHomeAndParkingPage/CustomerVehicleCard/CustomerVehicleCard';
import CalendarForApp from '../../components/CalendarForApp/CalendarForApp';
import { LogsStore, ParkingSlotsStore, UserStore } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import useGetLogs from '../../utils/hooks/useGetLogs';
import TransportCard from '../../components/ForCustomersAndTransportsPage/TransportCard/TransportCard';
import handleFindSlotNumFromVehicleId from '../../utils/handleFindSlotNumFromVehicleId';

function PaymentHistoryPage() {
    const [paidState, setPaidState] = useState<any>("paid");
    const [transport, setTransport] = useState<any>(false)
    const [currPage, setCurrPage] = useState(1)
    const [totalPage, setTotalPage] = useState<boolean | number>(false)
    const [date, setDate] = useState<any>(() => {
        const date = new Date();
        const startOfDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0)); // set time to 00:00:00.000Z
        const endOfDay = new Date(startOfDay.getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000);
        return {
            start: startOfDay.toISOString(),
            end: endOfDay.toISOString()
        }
    })
    const logsLoading = useSelector(LogsStore).loading
    const user = useSelector(UserStore).user
    const {logs, revenue, totalRecords} = useSelector(LogsStore)
    useGetLogs({
        paidState, currPage, setTotalPage, date, vehicle:transport
    })    
    const parkingSlots = useSelector(ParkingSlotsStore).parkingSlots

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
        className="flex h-fit w-full flex-col-reverse lg:flex-row lg:justify-between space-x-4">
        <div
            className="h-full w-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden space-y-4"
        >
            <div className="w-full h-fit flex justify-between items-center">
                <span className="text-md text-title-inPage font-semibold capitalize">
                    Payment history
                </span>
            </div>
            <div className="w-full h-fit flex justify-start items-center">
                <span onClick={() => { setPaidState("paid"); setCurrPage(1); setTotalPage(1) }} className={clsx("cursor-pointer text-md capitalize", {
                    "text-title-inPage font-normal": paidState === "paid",
                    "text-gray-400 font-thin": paidState === "unpaid" || paidState === "all" || paidState==="nodate"
                })}>Paid With Date</span>/
                <span onClick={() => { setPaidState("unpaid"); setCurrPage(1); setTotalPage(1) }} className={clsx("pl-1 cursor-pointer text-md capitalize", {
                    "text-title-inPage font-normal": paidState === "unpaid",
                    "text-gray-400 font-thin": paidState === "paid" || paidState === "all" || paidState==="nodate"
                })}>unpaid With Date</span>/
                <span onClick={() => { setPaidState("all"); setCurrPage(1); setTotalPage(1) }} className={clsx("pl-1 cursor-pointer text-md capitalize", {
                    "text-title-inPage font-normal": paidState === "all",
                    "text-gray-400 font-thin": paidState === "paid" || paidState === "unpaid" || paidState==="nodate"
                })}> all</span>
            </div>
            <div className="w-full h-fit flex justify-start items-center">
                <span className="font-bold text-super-small">Results: {totalRecords}</span>
            </div>
            {
                revenue>0 &&
                <div className="w-full h-fit flex justify-start items-center">
                    <span className="font-bold text-super-small">Money: {revenue}$</span>
                </div>
            }
            <div className="w-full min-h-0 flex flex-col gap-2 max-h-[600px] overflow-auto p-4">
                {
                    logsLoading ?
                        <div className="w-full h-full flex justify-center items-center">
                            <Spinner />
                        </div>
                        :
                        <>
                            {
                                logs && logs.map((log: any, index: number) => {
                                    return <CustomerVehicleCard key={index} type={log.timeOut ? "paid" : "unpaid"} data={log} />
                                })
                            }
                        </>
                }
            </div>
            <div className="w-full h-fit flex justify-end">
                <Pagination setCurrPage={setCurrPage} currPage={currPage} totalPage={totalPage} />
            </div>
        </div>
        <div
            className="h-fit min-w-[370px] mb-4 drop-shadow-xl flex overflow-hidden justify-center"
        >
            {
                user.role === "admin" ?
                    <CalendarForApp date={date} setDate={setDate} />
                    :
                    <>
                        <div className="w-full h-fit flex rounded-xl flex-col space-y-4 p-2 bg-white shadow-md max-h-full overflow-y-auto">
                            <span className="w-full h-fit text-base font-semibold text-title-inPage">Click on your vehicle for detail</span>
                            {user.vehicles && user.vehicles.length > 0 ?
                                user.vehicles.map((vehicle: any, index: number) => {
                                    return <TransportCard noAdjustSignal slot={handleFindSlotNumFromVehicleId(vehicle.vehicleId, parkingSlots)} data={vehicle} key={index} setTransport={setTransport} transport={transport}/>
                                })
                                :
                                <div className="w-full h-full flex justify-center items-center">
                                    <span className="text-md text-gray-400 font-thin">No vehicle</span>
                                </div>
                            }
                        </div>
                    </>
            }
        </div>
    </motion.div>);
}

export default memo(PaymentHistoryPage);