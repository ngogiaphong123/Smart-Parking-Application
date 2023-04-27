import { memo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { pageMotionTime } from '../../configs';
import CalendarForApp from '../../components/CalendarForApp/CalendarForApp';
import arrowRight from '../../assets/icon/arrow-right.svg'
import arrowRightOff from '../../assets/icon/arrow-right-off.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import PieChart from '../../components/ForAnalyticsPage/PieChart/PieChart';
import BarChart from '../../components/ForAnalyticsPage/BarChart/BarChart';
import SearchBar from '../../components/SearchBar/SearchBar';
import TransportAnalytic from '../../components/ForAnalyticsPage/TransportAnalytic/TransportAnalytic';
import CustomerAnalytic from '../../components/ForAnalyticsPage/CustomerAnalytic/CustomerAnalytic';
function AnalyticsPage() {
    const [timeMode, setTimeMode] = useState<'today' | 'thismonth' | 'thisweek'>('today');
    const [pageMode, setPageMode] = useState<'general' | 'detail'>('detail');
    const [searchType, setSearchType] = useState<'customer' | 'transport'>('customer');
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
                            >
                                <div
                                    className="w-full h-fit flex justify-between items-center">
                                    <span className="text-sm font-semibold capitalize">Analytics</span>
                                    <div className="w-fit h-fit inline-flex items-center">
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
                                <PieChart />
                                <div className="w-full h-fit flex justify-between items-center">
                                    <span className="text-sm font-semibold capitalize">Monthly Revenue</span>
                                </div>
                                <BarChart />
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
                                        <span onClick={() => { setSearchType("customer") }} className={clsx("cursor-pointer text-md capitalize", {
                                            "text-title-inPage font-normal": searchType === "customer",
                                            "text-gray-400 font-thin": searchType === "transport"
                                        })}>customer</span>/
                                        <span onClick={() => { setSearchType("transport") }} className={clsx("pl-1 cursor-pointer text-md capitalize", {
                                            "text-title-inPage font-normal": searchType === "transport",
                                            "text-gray-400 font-thin": searchType === "customer"
                                        })}>transport</span>
                                    </div>
                                    <div className="w-full h-fit space-y-4 flex-flex-col items-center">
                                        {
                                            searchType === "customer" ?
                                                <>
                                                    <CustomerAnalytic />
                                                    <CustomerAnalytic />
                                                    <CustomerAnalytic />
                                                </>
                                                :
                                                <>
                                                    <TransportAnalytic />
                                                    <TransportAnalytic />
                                                    <TransportAnalytic />
                                                </>
                                        }
                                    </div>
                                </div>
                            </motion.div>
                    }
                </AnimatePresence>
            </div>
            <div
                className="h-full min-w-[370px] px-4 mb-4 drop-shadow-xl flex overflow-hidden justify-center flex-col space-y-4 items-center"
            >
                <CalendarForApp />
                <div className="w-full h-fit p-6 rounded-xl shadow-ml bg-white space-y-2">
                    <span className="w-full h-fit text-base font-semibold capitailize">
                        Monthly
                    </span>
                    <div className="w-full flex justify-between items-center h-fit">
                        <span className="text-sm font-semibold capitailize">
                            Total Intake
                        </span>
                        <span className="text-sm font-normal capitailize">
                            1500k
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center h-fit">
                        <span className="text-sm font-semibold capitailize">
                            New Customers
                        </span>
                        <span className="text-sm font-normal capitailize">
                            1500k
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center h-fit">
                        <span className="text-sm font-semibold capitailize">
                            Repeat Customers
                        </span>
                        <span className="text-sm font-normal capitailize">
                            1500k
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center h-fit">
                        <span className="text-sm font-semibold capitailize">
                            Total Revenue
                        </span>
                        <span className="text-sm font-normal capitailize">
                            1500k
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    </>);
}

export default memo(AnalyticsPage);