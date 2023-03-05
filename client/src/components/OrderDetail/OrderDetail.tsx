import { memo, useState, useCallback } from 'react'
import CalendarForApp from '../CalendarForApp/CalendarForApp';
function OrderDetail() {
    const [minutes, setMinutes] = useState(180)
    const convertHHMM = useCallback((minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }, [])
    return (<>
        <div className="min-w-0 max-w-[600px] rounded-2xl drop-shadow-md flex flex-col bg-white p-4 light">
            <div className="w-full text-sm font-semibold text-gray-700 py-2">
                Order Detail
            </div>
            <div className="w-full flex">
                <div className="w-[45%] flex flex-col items-start gap-2">
                    <label htmlFor="default-range" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Time before parking: {convertHHMM(minutes)}</label>
                    <input onChange={(e) => { setMinutes(parseInt(e.target.value)) }} id="default-range" type="range" min={1} max={360} value={minutes} step={1} className="group mt-2 mb-4 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
                    <div className="w-full flex flex-col mt-4">
                        <div className="w-full h-full bg-blue-200 p-4 flex flex-col gap-4">
                            <span className="font-normal text-super-small text-gray-500 uppercase">vehicle</span>
                            <span className="font-normal text-super-small text-gray-500 uppercase">parking price per hour</span>
                            <div className="flex justify-between">
                                <span className="font-bold text-super-small">Price: 2$/h</span>
                                <span className="font-bold text-super-small">Slot: 1</span>
                            </div>
                        </div>
                        <div className="w-full p-2 border-l-2 border-blue-500 bg-blue-300 flex items-center justify-between">
                            <span className="font-normal text-super-small text-gray-500 uppercase">Total</span>
                            <span className="font-bold text-super-small uppercase">$4.00</span>
                        </div>
                    </div>
                </div>
                <div className="w-[55%] flex flex-col items-center justify-start p-4">
                    <CalendarForApp />
                </div>
            </div>
            <div className="w-full h-12 flex justify-center items-center">
                <div className="w-36 rounded-xl bg-blue-400 transition duration-150 hover:bg-blue-500 cursor-pointer h-8 text-white font-semibold flex justify-center items-center">
                    Confirm
                </div>
            </div>
        </div>
    </>);
}

export default memo(OrderDetail);