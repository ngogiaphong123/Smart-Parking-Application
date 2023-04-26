import { memo } from 'react'
import google from '../../../assets/icon/google.png'
import trashbin from '../../../assets/icon/trashbin.svg'
import cancel from '../../../assets/icon/cancel.svg'

function TransportCard({slot}:{slot:string}) {
    return (<>
        <div className="w-full cursor-pointer bg-white hover:bg-gray transition duration-200 ease-in-out rounded-xl p-4  flex items-center drop-shadow-md">
            <div className="flex flex-1">
                <div className="flex justify-center items-center border-1 border-gray rounded-full">
                    <img src={google} alt="" className="w-16 h-16 p-2  " />
                </div>
            </div>
            <div className="flex flex-col justify-center items-start flex-[2_2_0]">
                <span className="font-semibold text-super-small capitalize">Xe dap</span>
                <p className="font-thin text-super-small capitalize">Registered from May 25, 2023</p>
                <p className="font-thin text-super-small capitalize inline">Slot: 
                {
                    slot==="none"?
                    <span className="font-semibold text-super-small uppercase"> NONE</span>
                    :
                    <span className="font-normal text-super-small text-[#81D0DF] uppercase"> {slot}</span>
                }
                </p>
            </div>
            <div className="h-full my-auto flex items-center gap-2">
                <div className="cursor-pointer hover:bg-[#CECECE] transition duration-100 ease-in-out flex justify-center items-center rounded-md w-6 h-6 bg-[#D9D9D9]">
                    <img src={cancel} alt="" className="w-4 h-4 " />

                </div>
                <div className="cursor-pointer hover:bg-[#F35B52] transition duration-100 ease-in-out flex justify-center items-center rounded-md w-6 h-6 bg-[#F7665E]">
                    <img src={trashbin} alt="" className="w-4 h-4 " />

                </div>

            </div>
        </div>
    </>);
}

export default memo(TransportCard);