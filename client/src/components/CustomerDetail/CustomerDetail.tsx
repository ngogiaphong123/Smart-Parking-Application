import { memo, useState } from 'react'
import google from '../../assets/icon/google.png'
import wrench from '../../assets/icon/wrench.svg'
// @ts-ignore
import Datepicker from "tailwind-datepicker-react"

function CustomerDetail({ type }: { type: string }) {
    const [adjust, setAdjust] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const handleChange = (selectedDate: Date) => {
        const yyyy = selectedDate.getFullYear();
        let mm = selectedDate.getMonth() + 1; // Months start at 0!
        let dd = selectedDate.getDate();
        if (dd < 10) 
        {
            // @ts-ignore
            dd = '0' + dd.toString();
        }
        if (mm < 10) 
        // @ts-ignore
        mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        setBirth(formattedToday)
    }
    const handleClose = (state: boolean) => {
        setShowCalendar(state)
    }
    const [name, setName] = useState("Nguyen Chung Son")
    const [email, setEmail] = useState("HiBuiTienDuc@gmail.com")
    const [phone, setPhone] = useState("0123456789")
    const [address, setAddress] = useState("Hanoi, Vietnam")
    const [birth, setBirth] = useState("01/01/2000")
    const options = {
        title: "Choose your birthday",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-white",
            todayBtn: "",
            clearBtn: "",
            icons: "text",
            text: "",
            disabledText: "bg-red-400",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: { // () => ReactElement | JSX.Element
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
    }
    return (<>
        <div className="w-full flex flex-col">
            <div className="w-full flex">
                <div className="dark flex flex-col items-center flex-1 p-4">
                    <img className="w-16 h-16 p-2 rounded-full drop-shadow border-1 border-gray" src={google} alt="" />
                    {
                        !adjust ?
                            <span className="text-sm font-normal py-4">Avatar image</span>
                            :
                            <>
                                <span className="text-sm font-normal py-4">Update image</span>
                                <input className="block w-full text-sm text-gray-200 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
                            </>
                    }
                </div>
                <div className="flex flex-col w-full flex-[2_2_0] items-start py-2 pl-2 gap-2">
                    {
                        !adjust ?
                            <>
                                <p className="font-bold text-super-small inline">Name: <span className="text-super-small inline font-normal">{name}</span></p>
                                <p className="font-bold text-super-small inline">Birth: <span className="text-super-small inline font-normal">{birth}</span></p>
                                <p className="font-bold text-super-small inline">Address: <span className="text-super-small inline font-normal">{address}</span></p>
                                <p className="font-bold text-super-small inline">Email: <span className="text-super-small inline font-normal">HiBuiTienDuc@gmail.com</span></p>
                                <p className="font-bold text-super-small inline">Phone: <span className="text-super-small inline font-normal">{phone}</span></p>
                                <p className="font-bold text-super-small inline">SSN: <span className="text-super-small inline font-normal">010203thi04diemvxl</span></p>
                            </>
                            :
                            <>
                                <div className="relative w-full">
                                    <input onChange={(e) => {
                                        setName(e.target.value)
                                    }} value={name} type="text" id="floating_outlined1" className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="floating_outlined1" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        Name:{name}</label>
                                </div>
                                <div className="relative w-full flex items-center ">
                                    <label htmlFor="" className="text-super-small font-semibold pr-2">
                                        Birth:
                                    </label>
                                    <Datepicker options={options} onChange={handleChange} show={showCalendar} setShow={handleClose} />
                                </div>
                                <div className="relative w-full">
                                    <input onChange={(e) => {
                                        setAddress(e.target.value)
                                    }} type="text" id="floating_outlined2" value={address} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="floating_outlined2" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        Address:{address}</label>
                                </div>
                                <div className="relative w-full">
                                    <input onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} type="text" id="floating_outlined3" value={email} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="floating_outlined3" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        Email:{email}</label>
                                </div>
                                <div className="relative w-full">
                                    <input onChange={(e) => {
                                        setPhone(e.target.value)
                                    }} type="text" id="floating_outlined4" value={phone} className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="floating_outlined4" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        Phone:{phone}</label>
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="w-full flex justify-between items-start px-4 py-2">
                <div className="w-full flex flex-col items-start">
                    <p className="font-semibold text-super-small inline">RFID: <span className="text-super-small inline font-normal">ABCJAXMINE</span></p>
                    <p className="font-semibold text-super-small inline">Total Transportations: <span className="text-super-small inline font-normal">1</span></p>
                </div>
                {
                    type === "adjust" &&
                    <button onClick={() => { setAdjust(prev => !prev) }} className="w-8 h-8 p-1 rounded-xl hover:bg-blue-500 flex justify-center items-center">
                        <img src={wrench} alt="" />
                    </button>
                }
            </div>
        </div>
    </>);
}

export default memo(CustomerDetail);