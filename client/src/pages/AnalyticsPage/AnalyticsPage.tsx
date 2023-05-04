import { memo, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { pageMotionTime } from '../../configs';
import CalendarForApp from '../../components/CalendarForApp/CalendarForApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import PieChart from '../../components/ForAnalyticsPage/PieChart/PieChart';
import BarChart from '../../components/ForAnalyticsPage/BarChart/BarChart';
import SearchBar from '../../components/SearchBar/SearchBar';
import CustomerAnalytic from '../../components/ForAnalyticsPage/CustomerAnalytic/CustomerAnalytic';
import { useDispatch } from 'react-redux';
import { logsPerDay, logsPerDayCustomer, logsPerHour, logsPerHourCustomer, logsPerWeek, logsPerWeekCustomer, piechartDetailAll, piechartDetailInDay, piechartDetailInMonth, piechartDetailInWeek, piechartGeneralAll, piechartGeneralInDay, piechartGeneralInMonth, piechartGeneralInWeek } from '../../redux/slices/StatisticsSlice';
import { getCustomers } from '../../redux/slices/CustomersSlice';
import { CustomersStore, StatisticsStore } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
function AnalyticsPage() {
    const [chosenCustomer, setChosenCustomer] = useState<any>(false)
    const { totalIntake, totalTransactions, totalTimeParking } = useSelector(StatisticsStore)
    const customers = useSelector(CustomersStore).customers
    const customersLoading = useSelector(CustomersStore).loading
    const [timeMode, setTimeMode] = useState<'today' | 'thismonth' | 'thisweek'>('today');
    const [allMode, setAllMode] = useState(false)
    const [pageMode, setPageMode] = useState<'general' | 'detail'>('general');
    const [date, setDate] = useState<any>(() => {
        const date = new Date();
        const startOfDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0)); // set time to 00:00:00.000Z
        return {
            start: startOfDay.toISOString(),
        }
    })
    const dispatch = useDispatch<any>()
    useEffect(() => {
        if (!chosenCustomer) {
            if (timeMode === "today") {
                dispatch(logsPerHour({
                    start: date.start
                }))
                if (!allMode)
                    dispatch(
                        piechartGeneralInDay
                            ({
                                start: date.start
                            }))
                else {
                    dispatch(piechartGeneralAll({
                        start: date.start,
                    }))
                }
            }
            else if (timeMode === "thisweek") {
                dispatch(logsPerDay({
                    start: date.start
                }))
                if (!allMode)
                    dispatch(
                        piechartGeneralInWeek
                            ({
                                start: date.start
                            }))
                else {
                    dispatch(piechartGeneralAll({
                        start: date.start,
                    }))
                }
            }
            else if (timeMode === "thismonth") {
                dispatch(logsPerWeek({
                    start: date.start
                }))
                if (!allMode)
                    dispatch(
                        piechartGeneralInMonth
                            ({
                                start: date.start
                            }))
                else {
                    dispatch(piechartGeneralAll({
                        start: date.start,
                    }))
                }
            }
        }
        else {
            if (timeMode === "today") {
                dispatch(logsPerHourCustomer({
                    start: date.start,
                    accountId: chosenCustomer.accountId
                }))
                if (!allMode)
                    dispatch(piechartDetailInDay({
                        start: date.start,
                        accountId: chosenCustomer.accountId
                    }))
                else {
                    dispatch(piechartDetailAll({
                        start: date.start,
                        accountId: chosenCustomer.accountId
                    }))
                }
            }
            else if (timeMode === "thisweek") {
                dispatch(logsPerDayCustomer({
                    start: date.start,
                    accountId: chosenCustomer.accountId
                }))
                if (!allMode)
                    dispatch(piechartDetailInWeek({
                        start: date.start,
                        accountId: chosenCustomer.accountId
                    }))
                else {
                    dispatch(piechartDetailAll({
                        start: date.start,
                        accountId: chosenCustomer.accountId
                    }))
                }
            }
            else if (timeMode === "thismonth") {
                dispatch(logsPerWeekCustomer({
                    start: date.start,
                    accountId: chosenCustomer.accountId
                }))
                if (!allMode)
                    dispatch(piechartDetailInMonth({
                        start: date.start,
                        accountId: chosenCustomer.accountId
                    }))
                else {
                    dispatch(piechartDetailAll({
                        start: date.start,
                        accountId: chosenCustomer.accountId
                    }))
                }
            }
        }

    }, [timeMode, date, chosenCustomer, allMode])

    useEffect(() => {
        dispatch(getCustomers({
            "page": 0,
            "limit": 6
        }))
    }, [])
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
            className="flex h-full w-full flex-col-reverse lg:flex-row lg:justify-between">
            <div className="h-full w-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden space-y-4">
                <div className="w-full h-8 flex justify-between items-center">
                    <div
                        onClick={() => {
                            if (pageMode !== 'general') {
                                setPageMode('general')
                            }
                        }}
                        className={clsx("group w-fit h-fit flex justify-between items-center space-x-2", {
                            "cursor-pointer": (pageMode !== 'general')
                        })}>
                        {
                            pageMode === 'detail' &&
                            <FontAwesomeIcon icon={faArrowLeft as IconProp} className='w-4 h-4 text-gray-300 group-hover:text-title-inPage' />
                        }
                        <span className={clsx("text-md  font-semibold capitalize group-hover:text-title-inPage", {
                            'text-gray-300': pageMode !== 'general',
                            'text-title-inPage': pageMode === 'general'
                        })}>
                            General stats
                        </span>
                    </div>
                    <div onClick={() => {
                        if (pageMode !== 'detail') {
                            setPageMode('detail')
                        }
                    }} className={clsx("group w-fit h-fit flex justify-between items-center space-x-2 ", {
                        "cursor-pointer": (pageMode !== 'detail')
                    })}>
                        <span className={clsx("text-md text-gray-300 group-hover:text-title-inPage font-semibold capitalize", {
                            'text-gray-300': pageMode !== 'detail',
                            'text-title-inPage': pageMode === 'detail'
                        })}>
                            Detail stats
                        </span>
                        {
                            pageMode === 'general' &&
                            <FontAwesomeIcon icon={faArrowRight as IconProp} className='w-4 h-4 text-gray-300 group-hover:text-title-inPage' />
                        }
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {
                        pageMode === 'general' ?
                            <motion.div
                                key="page1"
                                initial={{
                                    x: 0, y: 0
                                }}
                                exit={{
                                    x: "-100%", y: 0
                                }}
                                className="space-y-4">
                                <div className="w-full h-fit flex justify-between items-center">
                                    <span className="text-sm font-semibold capitalize">Analytics</span>
                                    <div className="w-fit h-fit inline-flex items-center">
                                        <span onClick={() => {
                                            setAllMode(prev => !prev)
                                        }} className={clsx("hover:text-gray-500 text-sm font-semibold capitalize cursor-pointer ", {
                                            'text-black': allMode,
                                            'text-gray-300': !allMode
                                        })}>All For Piechart</span>/
                                        <span onClick={() => {
                                            setTimeMode('today')
                                        }} className={clsx("text-sm font-semibold capitalize cursor-pointer  hover:text-black", {
                                            'text-black': timeMode === 'today',
                                            'text-gray-300': timeMode !== 'today'
                                        })}>Today</span>/
                                        <span onClick={() => {
                                            setTimeMode('thisweek')
                                        }} className={clsx("text-sm font-semibold capitalize cursor-pointer  hover:text-black", {
                                            'text-black': timeMode === 'thisweek',
                                            'text-gray-300': timeMode !== 'thisweek'
                                        })}> This week</span>/
                                        <span onClick={() => {
                                            setTimeMode('thismonth')
                                        }} className={clsx("text-sm font-semibold capitalize cursor-pointer  hover:text-black", {
                                            'text-black': timeMode === 'thismonth',
                                            'text-gray-300': timeMode !== 'thismonth'
                                        })}> This month</span>
                                    </div>
                                </div>
                                {
                                    chosenCustomer &&
                                    <div className="w-full h-fit text-center font-semibold">
                                        In detail with <span className="text-title-inPage">{chosenCustomer.firstName + " " + chosenCustomer.lastName}</span>,
                                        <span onClick={() => {
                                            setPageMode('detail')
                                        }} className="text-gray-300 hover:text-title-inPage cursor-pointer"> choose another?</span>
                                        <span onClick={() => {
                                            setChosenCustomer(false)
                                        }} className="text-gray-300 hover:text-title-inPage cursor-pointer"> or see general detail?</span>
                                    </div>
                                }
                                <div className="w-full h-fit">
                                    <PieChart chosenCustomer={chosenCustomer} date={date} timeMode={timeMode} allMode={allMode} />
                                </div>

                                <div className="w-full h-fit flex justify-between items-center">
                                    <span className="text-sm font-semibold capitalize">Logs Statistics</span>
                                </div>
                                <div className="w-full h-fit max-h-96">
                                    <BarChart timeMode={timeMode} date={date} />
                                </div>
                            </motion.div>
                            :
                            <motion.div
                                key="page2"
                                initial={{
                                    x: 0, y: 0
                                }}
                                exit={{
                                    x: "100%", y: 0
                                }}
                            >
                                <div
                                    className="w-full h-fit p-2 flex flex-col items-center space-y-6">
                                    <SearchBar />
                                    <div className="w-full h-8 flex justify-start items-center capitalize">
                                        <span className={clsx("cursor-pointer text-md capitalize text-title-inPage font-normal")}>customer</span>
                                    </div>
                                    <div className="w-full h-fit space-y-4 flex-flex-col items-center">
                                        <>
                                            {
                                                customersLoading ?
                                                    <div className="w-full h-full flex justify-center items-center">
                                                        <Spinner />
                                                    </div>
                                                    :
                                                    <>
                                                        {customers && customers.map((customer: any, index: number) => {
                                                            return <CustomerAnalytic data={customer} key={index} setChosenCustomer={setChosenCustomer} chosenCustomer={chosenCustomer} setPageMode={setPageMode} />
                                                        })}
                                                    </>
                                            }
                                        </>
                                    </div>
                                </div>
                            </motion.div>
                    }
                </AnimatePresence>
            </div>
            <div
                className="h-full min-w-[370px] px-4 mb-4 drop-shadow-xl flex overflow-hidden justify-center flex-col space-y-4 items-center"
            >
                <CalendarForApp setDate={setDate} />
                <div className="w-full h-fit p-6 rounded-xl shadow-ml bg-white space-y-2">
                    <span className="w-full h-fit text-base font-semibold capitailize">
                        {timeMode === "today" ? "Daily" : timeMode === "thisweek" ? "Weekly" : "Monthly"}
                    </span>
                    <div className="w-full flex justify-between items-center h-fit">
                        <span className="text-sm font-semibold capitailize">
                            Total Intake
                        </span>
                        <span className="text-sm font-normal capitailize">
                            {totalIntake}$
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center h-fit">
                        <span className="text-sm font-semibold capitailize">
                            Total Transactions
                        </span>
                        <span className="text-sm font-normal capitailize">
                            {totalTransactions}
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center h-fit">
                        <span className="text-sm font-semibold capitailize">
                            Total time parking
                        </span>
                        <span className="text-sm font-normal capitailize">
                            {totalTimeParking}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    </>);
}

export default memo(AnalyticsPage);