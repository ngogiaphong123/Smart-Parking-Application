import { memo } from 'react'
import fb from '../../assets/icon/fb.png'
import google from '../../assets/icon/google.png'

function LoginForm() {
    return (<>
        <div className="rounded-2xl w-72 min-h-96 bg-white drop-shadow-md flex flex-col px-4 py-6 bg-opacity-[.82]">
            <div className="w-full h-10 p-4">
                <p className="font-semibold text-lg">
                    Sign in
                </p>
            </div>
            <div className="w-full p-8 pb-4 flex justify-center">
                <div className="w-20 flex justify-around">
                    <div className=":bg-gray-hover cursor-pointer w-8 h-8 border-1 border-black rounded-lg flex justify-center items-center">
                        <img src={google} className="w-4 h-4" />
                    </div>
                    <div className="hover:bg-gray-hover cursor-pointer w-8 h-8 border-1 border-black rounded-lg flex justify-center items-center">
                        <img src={fb} className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className="w-full  flex flex-col items-center">
                <input type="text" placeholder="Email" className="m-2 p-2 placeholder:text-sm max-w-36 rounded-xl border-1 border-gray focus:outline-none focus:ring focus:ring-blue-400" />
                <input type="password" placeholder="Password" className="m-2 p-2 placeholder:text-sm max-w-36 rounded-xl border-1 border-gray focus:outline-none focus:ring focus:ring-blue-400 " />
            </div>
            <p className="w-full px-4 pb-8 font-semibold text-sm">
                Forgot password?
            </p>
            <div className="rounded-md w-full py-1 bg-blue-500">
                <p className="text-center text-white font-semibold text-md">Sign in</p>
            </div>
            <div className="w-full p-2 flex text-sm">
                <p className="">
                    New to ParkingAuto? 
                </p>
                <p className="pl-2 font-semibold">Sign Up</p>
            </div>
        </div>
    </>);
}

export default memo(LoginForm);