import { memo, useState } from 'react'
import fb from '../../assets/icon/fb.png'
import google from '../../assets/icon/google.png'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    return (<>
        <motion.div 
        initial={{
            opacity:0,
            y:"100%"
        }}
        animate={{
            opacity:1,
            y:0
        }}
        exit={{
            opacity:0,
            y:"100%"
        }}
        transition={{
            duration:1
        }}
        className="rounded-2xl w-72 min-h-96 bg-white drop-shadow-md flex flex-col px-4 py-6">
            <div className="w-full h-10 px-4">
                <p className="font-semibold text-lg">
                    Sign in
                </p>
            </div>
            <div className="w-full p-8 pb-4 flex justify-center">
                <div className="w-20 flex justify-around">
                    <div className="hover:bg-gray-hover cursor-pointer w-8 h-8 border-1 border-black rounded-lg flex justify-center items-center">
                        <img src={google} className="w-4 h-4" />
                    </div>
                    <div className="hover:bg-gray-hover cursor-pointer w-8 h-8 border-1 border-black rounded-lg flex justify-center items-center">
                        <img src={fb} className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className="w-full gap-2 flex flex-col items-center">
                <div className="relative w-full">
                    <input onChange={(e) => {
                        setName(e.target.value)
                    }} value={name} type="text" id="floating_outlined1" className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="floating_outlined1" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Name: {name}</label>
                </div>
                <span className=" text-ant text-red-400 font-normal ">Error this thing must be right</span>

                <div className="relative w-full">
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" id="password" value={password} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Password:</label>
                </div>
                <span className=" text-ant text-red-400 font-normal ">Error this thing must be right</span>

            </div>
            <p className="w-full px-4 pb-8 font-semibold text-sm">
                Forgot password?
            </p>
            <button onClick={()=>{navigate('/signup')}} className="rounded-md w-full py-1 bg-blue-500 hover:bg-blue-600">
                <p className="text-center text-white font-semibold text-md">Sign in</p>
            </button>
            <button onClick={()=>{navigate('/admin')}} className="mt-2 rounded-md w-full py-1 bg-blue-500 hover:bg-blue-600">
                <p className="text-center text-white font-semibold text-md">Try as admin</p>
            </button>
            <div className="w-full p-2 flex text-sm">
                <p className="">
                    New to ParkingAuto?
                </p>
                <p className="pl-2 font-semibold">Sign Up</p>
            </div>
        </motion.div>
    </>);
}

export default memo(LoginForm);