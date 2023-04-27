import { memo, useState, useEffect } from 'react'
// @ts-ignore
import car_gif from '../../../assets/car/car_running_stop.gif'
import car_stop_img from '../../../assets/car/car_stop.png'
import { useDispatch } from 'react-redux'
import OrderModalSlice from '../../../redux/slices/modals/OrderModalSlice'
import { useSelector } from 'react-redux'
import { UserStore } from '../../../redux/selectors'

function ParkingSlotCard({ data, index }: { data: any, index: number }) {
    if (data.status === "RESERVED")
        console.log(data)
    const dispatch = useDispatch<any>()
    const user = useSelector(UserStore).user
    const [stop, setStop] = useState(false)
    function handleBalanceCal(time: string, pricePerHour: string) {
        console.log(time)
        const timeIn = new Date(time);
        const timeOut = new Date();
        const diff = timeOut.getTime() - timeIn.getTime();
        const diffHours = diff / (1000 * 3600);
        const price = Math.ceil(diffHours) * parseInt(pricePerHour);
        return price;
    }
    function handleDateShowing(time: string) {
        // create a new Date object with the original date string
        const originalDate = new Date(time);

        // create an array of weekday names
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const dayOfWeek = daysOfWeek[originalDate.getDay()];
        const dayOfMonth = originalDate.getDate();
        const year = originalDate.getFullYear();
        let hour = originalDate.getHours();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        const minutes = originalDate.getMinutes();

        const formattedDate = `${dayOfMonth} ${dayOfWeek} ${year} ${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`;

        return (formattedDate); // "4/27 Thursday"
    }
    useEffect(() => {
        const handleStop = setTimeout(() => {
            setStop(true)
        }, 4000)
        return () => {
            clearTimeout(handleStop)
        }
    }, []);
    return (<>
        <div onClick={() => {
            if (user.role === "user")
                dispatch(OrderModalSlice.actions.handleOpen({}))
        }} className="group w-fit cursor-pointer">
            <div id="main" className="gap-3 w-64 h-96 rounded-lg shadow-lg bg-white ease-linear transition duration-150 hover:bg-blue-300">
                {
                    data.status !== "AVAILABLE" &&
                    <>
                        <div className="group-hover:hidden flex flex-col justify-around w-full h-full">
                            <img id="car" className=" w-4/5  mx-auto mt-5 rounded-lg" src={stop ? car_stop_img : car_gif} />
                            <div className="rounded-xl bg-sky-300 w-40 mx-auto mb-8 p-2">
                                <p className="text-center text-white font-semibold">{data.status}</p>
                            </div>
                        </div>
                        <div className="w-full h-full group-hover:flex hidden flex-col justify-around ">
                            <img id="userImage" className=" w-2/5 rounded-full  mx-auto mt-5 " src={data.reservedBy.avatarUrl} />
                            <h4 className="font-semibold text-center text-white">{data.reservedBy.firstName + " " + data.reservedBy.lastName}</h4>
                            <div className="bg-sky-50 rounded-full w-36 mx-auto">
                                <h4 className="text-blue-300 text-center">{data.vehicle.numberPlate}</h4>
                            </div>
                            {
                                data.status === "RESERVED" &&
                                <>
                                    <div>
                                        <p className="font-normal text-sky-50 text-center">Model: {data.vehicle.model}</p>
                                    </div>
                                    <div className="-mb-2">
                                        <p className="font-semibold text-sky-50 text-center">Price per hour: {data.pricePerHour}$</p>
                                    </div>
                                    <div className="cursor-pointer p-2 px-4 bg-blue-800 rounded-full mb-2 mx-auto">
                                        <p className="text-center text-white my-auto">Genre: {data.vehicle.genre}</p>
                                    </div>
                                </>
                            }
                            {
                                data.status === "OCCUPIED" &&
                                <>
                                    <div>
                                        <p className="font-normal text-sky-50 text-center">From: {handleDateShowing(data.startTime)}</p>
                                    </div>
                                    <div className="-mb-2">
                                        <p className="font-semibold text-sky-50 text-center">Unpaid balance: {handleBalanceCal(data.startTime, data.pricePerHour)}$</p>
                                    </div>
                                    <div className="cursor-pointer p-2 px-4 bg-blue-800 rounded-full mb-2 mx-auto">
                                        <p className="text-center text-white my-auto">Send Payment</p>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="-mb-5 text-gray-600 text-center font-semibold">SLOT {index + 1}</div>
                    </>
                }
                {
                    data.status === "AVAILABLE" &&
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-6">
                        <div className="-mb-5 text-gray-600 text-center font-semibold">SLOT {index + 1}</div>

                        <div className="rounded-xl bg-gray w-40 mx-auto mb-8 p-2">
                            <p className="text-center text-black font-semibold">{data.status}</p>
                        </div>
                        <div className="-mb-2">
                            <p className="font-semibold text-gray-500 text-center">Price per hour: {data.pricePerHour}$</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    </>);
}

export default memo(ParkingSlotCard);