import {memo} from 'react'
import handleBalanceCalFromDBS from '../../../utils/handleBalanceCalFromDBS';
import handleDateShowingFromDBS from '../../../utils/handleDateShowingFromDBS';

function CustomerVehicleCard({type, data}: {data:any, type: "paid"|"unpaid"}) {
    return ( <>
        <div className="w-full cursor-pointer bg-white hover:bg-gray transition duration-200 ease-in-out rounded-xl p-4  flex items-center drop-shadow-md">
            <div className="flex flex-1">
                <div className="flex justify-center items-center ">
                    <img src={data.vehicle.user.avatarUrl} alt="" className="w-16 h-16 p-2 rounded-full shadow-md" />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-[2_2_0]">
                <span className="font-semibold text-super-small">{data.vehicle.user.firstName + " " + data.vehicle.user.lastName}</span>
                <p className="font-thin text-super-small capitalize">From: {handleDateShowingFromDBS(data.timeIn)}{data.timeOut?" to "+handleDateShowingFromDBS(data.timeOut):""}</p>
                <div className="p-1 min-w-0 max-w-[100px] rounded-md bg-[#81D0DF] flex justify-center items-center">
                    <span className="text-white text-ant uppercase truncate">{data.vehicle.numberPlate}</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center border-l-1 border-gray">
                <span className="text-sm font-semibold">${handleBalanceCalFromDBS(data.timeIn, data.parkingSlot.pricePerHour, data.timeOut?data.timeOut:null)}</span>
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