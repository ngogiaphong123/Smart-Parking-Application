import { memo, useState, useEffect, useCallback, useRef } from 'react'
import ArrowsLR from '../../components/ForHomeAndParkingPage/ArrowsLR/ArrowsLR';
import ParkingSlotCard from '../../components/ForHomeAndParkingPage/ParkingSlotCard/ParkingSlotCard';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import CustomerVehicleCard from '../../components/ForHomeAndParkingPage/CustomerVehicleCard/CustomerVehicleCard';
import { motion } from 'framer-motion'
import { pageMotionTime } from '../../configs'
import { useSelector } from 'react-redux';
import { LogsStore, UserStore } from '../../redux/selectors';
import useParkingSlotsSocket from '../../utils/hooks/useParkingSlotsSocket';
import useGetLogs from '../../utils/hooks/useGetLogs';
function HomeAndParkingPage() {
    const user = useSelector(UserStore).user
    const swiperRef = useRef<any>(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const parkingSlots = useParkingSlotsSocket()
    const [currPage, setCurrPage] = useState(1)
    const [totalPage, setTotalPage] = useState<boolean | number>(false)
    const logs = useSelector(LogsStore).logs
    useGetLogs({
        currPage, setTotalPage,
        paidState:"unpaidWithNoDate"
    })
    const handleIncreaseIndex = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev < 5) {
                swiperRef.current?.swiper?.slideTo(prev + 1);
                return prev + 1
            }
            else return prev
        })

    }, [])
    const handleDecreaseIndex = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev > 0) {
                swiperRef.current?.swiper?.slideTo(prev - 1);
                return prev - 1;
            }
            else return 0
        })
    }
        , [])
    const handleSlideChange = (swiper: any) => {
        const newIndex = swiper.activeIndex;
        setCurrentIndex(newIndex);
    }
    const [swiperRes, setSwiperRes] = useState(() => {
        if (window.innerWidth < 700) {
            return (1);
        }
        else if (window.innerWidth < 1150) {
            return (2)
        }
        else return (3);
    })
    useEffect(() => {
        function handleSwiperRes() {
            if (window.innerWidth < 700) {
                setSwiperRes(1);
            }
            else if (window.innerWidth < 1150) {
                setSwiperRes(2)
            }
            else setSwiperRes(3);
        }
        window.addEventListener('resize', handleSwiperRes);
        return () => {
            window.removeEventListener('resize', handleSwiperRes);
        }
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

            className="w-full h-fit p-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden">
            <div className="w-full h-8 flex justify-between items-center " >
                <span className="text-md text-title-inPage font-semibold capitalize">
                    car parking
                </span>
                <button className="w-32 h-7 bg-blue-inPage hover:bg-blue-inPage-hover rounded-2xl flex justify-center items-center">
                    <span className="text-super-small font-semibold text-white uppercase">
                        + Parking Slot
                    </span>
                </button>
            </div>
            <div className="w-full my-2 h-8 flex justify-between items-center " >
                <span className="text-sm text-gray-500 font-bold capitalize">
                    Current parking slots
                </span>
                <div className="w-48 flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-bold capitalize">
                        Order: 1-4
                    </span>
                    <ArrowsLR handleIncreaseIndex={handleIncreaseIndex} handleDecreaseIndex={handleDecreaseIndex} />
                </div>
            </div>
            <Swiper
                ref={swiperRef}
                slidesPerView={swiperRes}
                initialSlide={currentIndex}
                // current slide
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="w-full"
                style={{ padding: "20px 9%" }}
                onSlideChange={handleSlideChange}
            >
                <div className="w-full min-h-full gap-2 my-12">
                    {
                        parkingSlots.map((parkingSlot: any, index: number) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ParkingSlotCard data={parkingSlot} index={index} />
                                </SwiperSlide>
                            )
                        })
                    }
                </div>
            </Swiper>
            {
                user.role === 'admin' &&
                <>
                    <div className="w-full my-2 mt-4 h-8 flex justify-between items-center " >
                        <span className="text-sm text-gray-500 font-bold capitalize">
                            Current parking slots information
                        </span>
                    </div>
                    <div className="w-full lg:w-1/2 min-h-0 flex flex-col gap-2 max-h-[400px] overflow-auto p-4">
                        {
                            logs&&logs.map((log: any, index: number) => {
                                return (
                                    <CustomerVehicleCard key={index} data={log} type={log.timeOut?"paid":"unpaid"} />
                                )
                            })
                        }
                    </div>
                </>
            }
        </motion.div>
    </>);
}

export default memo(HomeAndParkingPage);