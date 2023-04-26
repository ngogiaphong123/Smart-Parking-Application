import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import { pageMotionTime } from '../../../configs'

function SignUpForm() {
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [phoneError, setPhoneError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [gender, setGender] = useState<string>('Female')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
    const [radioCheckbox, setRadioCheckbox] = useState<boolean>(false)
    const [radioCheckboxError, setRadioCheckboxError] = useState<string>('')
    const navigate = useNavigate()

    return (<>
        <motion.div
            key="signupnpage"
            initial={{
                opacity: 0,
                y: "100%"
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: "100%"
            }}
            transition={{
                duration: pageMotionTime
            }}
            className="w-96 p-4 pb-6 min-h-96 bg-white drop-shadow-md flex flex-col rounded-xl z-10 max-w-[360px] sm:max-w-full">
            <p className="text-lg font-semibold text-gray-500">Sign Up</p>
            <div className="relative w-full py-4 flex gap-4 border-b-1 border-gray items-center">
                <div className="bg-red-400 cursor-pointer hover:bg-red-500 flex-1 h-8 rounded-sm  text-center ">
                    <p className="text-white inline-block align-middle font-semibold text-ant sm:text-sm">
                        Signup with Google
                    </p>
                </div>
                <div className="bg-blue-500 cursor-pointer  hover:bg-blue-600 flex-1 h-8 rounded-sm text-center">
                    <p className="text-white text-center font-semibold text-ant sm:text-sm inline-block align-middle">
                        Signup with Facebook
                    </p>
                </div>
                <div className="absolute -bottom-2 right-[48.5%] text-gray-500 bg-white w-3">
                    <p className="text-sm p-0">
                        or
                    </p>
                </div>
            </div>
            <div className="w-full mt-4 min-h-fit gap-4 flex">
                <div className="flex-1 min-h-fit space-y-2">
                    <div>
                        {/* <label htmlFor="firstName" className="text-super-small font-semibold text-gray-400">First Name: </label>
                        <input type="text" id="firstName" placeholder="First Name" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" /> */}
                        <div className="relative w-full">
                            <input onChange={(e) => {
                                setName(e.target.value)
                            }} value={name} type="text" id="floating_outlined1" className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined1" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Name:</label>
                        </div>
                        {
                            nameError !=="" && <span className=" text-ant text-red-400 font-normal ">{nameError}</span>
                        }
                    </div>
                    <div>
                        {/* <label htmlFor="Email" className="text-super-small font-semibold text-gray-400">Email: </label>
                        <input type="text" id="Email" placeholder="Email" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" /> */}
                        <div className="relative w-full">
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="text" id="floating_outlined3" value={email} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined3" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Email:</label>
                        </div>
                        {
                            emailError!=="" && <span className=" text-ant text-red-400 font-normal ">{emailError}</span>
                        }
                    </div>


                    <div>
                        <label htmlFor="Gender" className="text-super-small font-semibold text-gray-400">Gender: </label>
                        {/* select gender */}
                        <select onChange={(e) => { setGender(e.target.value) }} name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Male" className="text-sm h-6"
                                selected={gender === "Male"}
                            >Male</option>
                            <option value="Female" className="text-sm h-6" selected={gender === "Female"} >Female</option>
                        </select>
                    </div>

                </div>
                <div className="flex-1 min-h-fit space-y-2">
                    {/* <div>
                        <label htmlFor="lastName" className="text-super-small font-semibold text-gray-400">Last Name: </label>
                        <input type="text" id="lastName" placeholder="Last Name" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span className=" text-ant text-red-400 font-normal ">Error this thing must be right</span>

                    </div> */}

                    <div>
                        {/* <label htmlFor="Phone" className="text-super-small font-semibold text-gray-400">Phone: </label>
                        <input type="text" id="Phone" placeholder="Phone" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" /> */}
                        <div className="relative w-full">
                            <input onChange={(e) => {
                                setPhone(e.target.value)
                            }} type="text" id="floating_outlined4" value={phone} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined4" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Phone:</label>
                        </div>
                        {
                            phoneError!=="" && <span className=" text-ant text-red-400 font-normal ">{phoneError}</span>
                        }
                    </div>

                    <div>
                        {/* <label htmlFor="Password" className="text-super-small font-semibold text-gray-400">Password: </label>
                        <input type="password" id="Password" placeholder="8+ Characters" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" /> */}
                        <div className="relative w-full">
                            <input onChange={(e) => {
                                setPassword(e.target.value)
                            }} type="password" id="password" value={password} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="password" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Password:</label>
                        </div>
                        {
                            passwordError!=="" && <span className=" text-ant text-red-400 font-normal ">{passwordError}</span>
                        }
                    </div>

                    <div>
                        {/* <label htmlFor="Confirm Password" className="text-super-small font-semibold text-gray-400">Confirm Password: </label>
                        <input type="password" id="Confirm Password" placeholder="Confirm Password" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" /> */}
                        <div className="relative w-full">
                            <input onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }} type="password" id="confirmPassword" value={confirmPassword} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="confirmPassword" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                ConfirmPassword:</label>
                        </div>
                        {
                            confirmPasswordError!=="" && <span className=" text-ant text-red-400 font-normal ">{confirmPasswordError}</span>
                        }
                    </div>
                </div>
            </div>
            <div className="w-full mt-4 flex gap-4">
                <div className="flex items-center mb-4 gap-4">
                    <input onChange={()=>{
                        setRadioCheckbox(!radioCheckbox)
                    }} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox" id="checkbox" className="flex-1 inline-block text-super-small leading-4 text-gray-400 font-thin">Creating an account means you’re okay with our <p className="text-blue-400 inline">Terms of Service</p>
                        , <p className="text-blue-400 inline">Privacy Policy</p>,
                        and our default <p className="text-blue-400 inline">Notification Settings</p>.
                    </label>
                </div>

            </div>
            {
                radioCheckboxError!=="" && <span className=" text-ant text-red-400 font-normal ">{radioCheckboxError}</span>
            }

            <div onClick={()=>{
                if(!radioCheckbox){
                    setRadioCheckboxError('You must agree to the terms and conditions')
                }else{
                    setRadioCheckboxError('')
                }

                if(!email){
                    setEmailError('Email is required')
                }else{
                    setEmailError('')
                }

                if(!password){
                    setPasswordError('Password is required')
                }else{
                    setPasswordError('')
                }

                if(!phone){
                    setPhoneError('Phone is required')
                }else{
                    setPhoneError('')
                }   

                if(!name){
                    setNameError('Name is required')    
                }else{
                    setNameError('')
                }

                if(confirmPassword!==password){
                    setConfirmPasswordError('Password and Confirm Password must be same')
                }else{
                    setConfirmPasswordError('')
                }

                if(!radioCheckbox || !email || !password || !confirmPassword || !phone || !name){
                    return
                }
            }} className="w-full mt-4 flex justify-between">
                <button className="w-36 p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-center inline-block align-middle font-semibold text-white text-sm">
                    Create Account
                </button>
                <div>
                    <p className="text-gray-400 text-super-small inline">Already a member?
                        <p onClick={()=>{navigate('/login')}} className="hover:text-blue-500 cursor-pointer text-super-small inline text-blue-400"> Sign in</p>
                    </p>
                </div>
            </div>
        </motion.div>
    </>);
}

export default memo(SignUpForm);