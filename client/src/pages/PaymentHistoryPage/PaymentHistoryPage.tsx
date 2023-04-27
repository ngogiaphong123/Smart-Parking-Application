import { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { pageMotionTime } from '../../configs';
import clsx from 'clsx';
import CustomerVehicleCard from '../../components/ForHomeAndParkingPage/CustomerVehicleCard/CustomerVehicleCard';
import CalendarForApp from '../../components/CalendarForApp/CalendarForApp';
import { useDispatch } from 'react-redux';
import { getLogsDate } from '../../redux/slices/LogsSlice';
import { LogsStore } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';

function PaymentHistoryPage() {
    const [paidState, setPaidState] = useState<any>("paid");
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
    const dispatch = useDispatch<any>()
    const logsLoading = useSelector(LogsStore).loading
    const logs = useSelector(LogsStore).logs
    console.log(date)
    useEffect(() => {
        dispatch(getLogsDate({
            "start": date.start,
            "end": date.end,
            "page": currPage - 1,
            "limit": 8,
            "paidState": paidState
        }))
            .then((res: any) => {
                setTotalPage(Math.ceil(res.payload.data.totalRecords / 8))
            })
    }, [currPage, paidState, date])
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
        className="flex h-fit w-full flex-col-reverse lg:flex-row lg:justify-between">
        <div
            className="h-full w-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden space-y-4"
        >
            <div className="w-full h-fit flex justify-between items-center">
                <span className="text-md text-title-inPage font-semibold capitalize">
                    Payment history
                </span>
            </div>
            <div className="w-full h-fit flex justify-start items-center">
                <span onClick={() => { setPaidState("paid") }} className={clsx("cursor-pointer text-md capitalize", {
                    "text-title-inPage font-normal": paidState === "paid",
                    "text-gray-400 font-thin": paidState === "unpaid"
                })}>Paid</span>/
                <span onClick={() => { setPaidState("unpaid") }} className={clsx("pl-1 cursor-pointer text-md capitalize", {
                    "text-title-inPage font-normal": paidState === "unpaid",
                    "text-gray-400 font-thin": paidState === "paid"
                })}> unpaid</span>
            </div>
            <div className="w-full h-fit flex justify-start items-center">
                <span className="font-bold text-super-small">Results: {logs.length}</span>
            </div>
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
            <CalendarForApp date={date} setDate={setDate} />
        </div>
    </motion.div>);
}

export default memo(PaymentHistoryPage);