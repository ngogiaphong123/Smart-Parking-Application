import { memo } from 'react'
import google from '../../../assets/icon/google.png'
import analytic from '../../../assets/icon/analytic.svg'

function TransportAnalytic() {
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
            </div>
            <div className="h-full my-auto flex items-center gap-2">
                <div className="cursor-pointer hover:bg-[#2FB1CA] transition duration-100 ease-in-out flex justify-center items-center rounded-md w-6 h-6 bg-[#81D0DF]">
                    <img src={analytic} alt="" className="w-4 h-4 " />

                </div>
            </div>
        </div>
    </>);
}

export default memo(TransportAnalytic);