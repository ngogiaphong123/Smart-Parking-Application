import { memo } from 'react'

function SignUpForm() {
    return (<>
        <div className="w-96 p-4 pb-6 min-h-96 bg-white drop-shadow-md flex flex-col rounded-xl bg-opacity-[.82]">
            <p className="text-lg font-semibold text-gray-500">Sign Up</p>
            <div className="relative w-full py-4 flex gap-4 border-b-1 border-gray items-center">
                <div className="bg-red-400 cursor-pointer hover:bg-red-500 flex-1 h-8 rounded-sm  text-center ">
                    <p className="text-white inline-block align-middle font-semibold text-sm">
                        Signup with Google
                    </p>
                </div>
                <div className="bg-blue-500 cursor-pointer  hover:bg-blue-600 flex-1 h-8 rounded-sm text-center">
                    <p className="text-white text-center font-semibold text-sm inline-block align-middle">
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
                <div className="flex-1 min-h-fit ">
                    <div>
                        <label htmlFor="firstName" className="text-super-small font-semibold text-gray-400">First Name: </label>
                        <input type="text" id="firstName" placeholder="First Name" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>
                    </div>
                    <div>
                        <label htmlFor="Email" className="text-super-small font-semibold text-gray-400">Email: </label>
                        <input type="text" id="Email" placeholder="Email" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>
                    </div>

                    <div>
                        <label htmlFor="Gender" className="text-super-small font-semibold text-gray-400">Gender: </label>
                        {/* select gender */}
                        <select name="gender" id="gender" className="w-full h-6 text-super-small border-1 border-gray focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-sm">
                            <option value="Male" className="text-sm h-6" >Male</option>
                            <option value="Female" className="text-sm h-6" >Female</option>
                        </select>
                        <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>

                    </div>

                    <div>
                        <label htmlFor="Password" className="text-super-small font-semibold text-gray-400">Password: </label>
                        <input type="password" id="Password" placeholder="8+ Characters" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>

                    </div>

                    <div>
                        <label htmlFor="Confirm Password" className="text-super-small font-semibold text-gray-400">Confirm Password: </label>
                        <input type="password" id="Confirm Password" placeholder="Confirm Password" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>

                    </div>

                </div>
                <div className="flex-1 nin-h-full ">
                    <div>
                        <label htmlFor="lastName" className="text-super-small font-semibold text-gray-400">Last Name: </label>
                        <input type="text" id="lastName" placeholder="Last Name" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>

                    </div>

                    <div>
                        <label htmlFor="Phone" className="text-super-small font-semibold text-gray-400">Phone: </label>
                        <input type="text" id="Phone" placeholder="Phone" className="w-full h-6 px-2 text-super-small rounded-sm border-1 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>

                    </div>
                </div>
            </div>
            <div className="w-full mt-4 flex gap-4">
                <div className="flex items-center mb-4 gap-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox" id="checkbox" className="flex-1 inline-block text-super-small leading-4 text-gray-400 font-thin">Creating an account means you’re okay with our <p className="text-blue-400 inline">Terms of Service</p>
                        , <p className="text-blue-400 inline">Privacy Policy</p>,
                        and our default <p className="text-blue-400 inline">Notification Settings</p>.
                    </label>
                </div>

            </div>
            <span className=" text-ant text-red-400 font-regular ">Error this thing must be right</span>

            <div className="w-full mt-4 flex justify-between">
                <button className="w-36 p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-center inline-block align-middle font-semibold text-white text-sm">
                    Create Account
                </button>
                <div>
                    <p className="text-gray-400 text-super-small inline">Already a member?
                        <p className="hover:text-blue-500 cursor-pointer text-super-small inline text-blue-400"> Sign in</p>
                    </p>
                </div>
            </div>
        </div>
    </>);
}

export default memo(SignUpForm);