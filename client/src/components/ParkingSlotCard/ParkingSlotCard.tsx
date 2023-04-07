import React, {memo, useState, useEffect} from 'react'
// @ts-ignore
import car_gif from '../../assets/car/car_running_stop.gif'
import car_stop_img from '../../assets/car/car_stop.png'

function ParkingSlotCard() {
    const [stop, setStop] = useState(false)
    useEffect(() => {
        const handleStop = setTimeout(() => {
                setStop(true)
            }, 4000)
        return () => {
            clearTimeout(handleStop)
        }
    }, []);
    return (<>
        <div className="group w-fit">
            <div id="main" className="gap-3 w-64 h-96 rounded-lg shadow-lg bg-white ease-linear transition duration-150 hover:bg-blue-300">
                    <div className="group-hover:hidden flex flex-col justify-around w-full h-full">
                        <img id="car" className=" w-4/5  mx-auto mt-5 rounded-lg" src={stop?car_stop_img:car_gif}/>
                        <div className="rounded-xl bg-sky-300 w-40 mx-auto mb-8 p-2">
                            <p className="text-center text-white font-semibold">Already in parking</p>
                        </div>
                    </div>
                    <div className="w-full h-full group-hover:flex hidden flex-col justify-around ">
                        <img id="userImage" className=" w-2/5 rounded-full  mx-auto mt-5 " src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-1/180867081_2919616028282594_3665352780591598452_n.jpg?stp=dst-jpg_s480x480&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=rjcfB6pjMsgAX9tTFoA&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfBsx5K4hFgEfdOC5w_sAYjSmnbVvuAm5-Kgy9VzZzKySg&oe=644F7181"/>
                        <h4 className="font-semibold text-center text-white">Tri Van</h4>
                        <div className="bg-sky-50 rounded-full w-36 mx-auto">
                            <h4 className="text-blue-300 text-center">Xe Lamboghini</h4>
                        </div>
                        <div>
                            <p className="font-normal text-sky-50 text-center">From Feb 28</p>
                        </div>
                        <div className="-mb-2">
                            <p className="font-semibold text-sky-50 text-center">Unpaid balance: 130$</p>
                        </div>
                        <div className="cursor-pointer p-2 px-4 bg-blue-800 rounded-full mb-2 mx-auto">
                            <p className="text-center text-white my-auto">Send Payment</p>
                        </div>
                    </div>
                    <div className="-mb-5 text-gray-600 text-center font-semibold">SLOT 1</div>
            </div>
        </div>
    </>);
}

export default memo(ParkingSlotCard);