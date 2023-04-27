import {memo} from 'react'
import google from '../../../assets/icon/google.png'

function CustomerVehicleCard({type}: {type: "paid"|"unpaid"}) {
    return ( <>
        <div className="w-full cursor-pointer bg-white hover:bg-gray transition duration-200 ease-in-out rounded-xl p-4  flex items-center drop-shadow-md">
            <div className="flex flex-1">
                <div className="flex justify-center items-center border-1 border-gray rounded-full">
                    <img src={google} alt="" className="w-16 h-16 p-2  " />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-[2_2_0]">
                <span className="font-semibold text-super-small">Tri van</span>
                <p className="font-thin text-super-small capitalize">Feb 12 - Feb 14</p>
                <div className="p-1 min-w-0 max-w-[100px] rounded-md bg-[#81D0DF] flex justify-center items-center">
                    <span className="text-white text-ant uppercase truncate">sdf</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center border-l-1 border-gray">
                <span className="text-sm font-semibold">$150</span>
                {
                    type === 'paid' ?
                    <p className="text-super-small font-semibold text-green-400">Paid</p>
                    :
                    <p className="text-super-small font-semibold text-red-400">UnPaid</p>
                }
            </div>
        </div>
    </> );
}

export default memo(CustomerVehicleCard);