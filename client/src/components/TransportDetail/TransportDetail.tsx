import { memo, useState } from 'react'
import parking_vehicle from '../../assets/VehicleImage/parking_vehicle.png'
import wrench from '../../assets/icon/wrench.svg'

function TransportDetail({ type, data, viewScrollRef }: { type: "nothing"|"adjust", data:any, viewScrollRef:any }) {
    const [name, setName] = useState("xe em be");
    const [license, setLicense] = useState("123456");
    const [adjust, setAdjust] = useState(false);
    return (<>
        <div ref={viewScrollRef} className="w-full flex p-4">
            <div className="h-full flex-1 flex flex-col items-center">
                <img className="w-16 h-16 p-2 rounded-full drop-shadow border-1 border-gray" src={parking_vehicle} alt="" />
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
            <div className="w-full flex flex-1 flex-col items-start">
                {
                    !adjust ?
                        <>
                            <p className="font-bold text-super-small inline">Genre: <span className="text-super-small inline font-normal">{data.genre}</span></p>
                            <p className="font-bold text-super-small inline">Model: <span className="text-super-small inline font-normal">{data.model}</span></p>
                            <p className="font-bold text-super-small inline">RFID: <span className="text-super-small inline font-normal">{data.rfidNumber}</span></p>
                            <p className="font-bold text-super-small inline">Numberplate: <span className="text-super-small inline font-normal">{data.numberPlate}</span></p>
                            <p className="font-bold text-super-small inline">VehicleID: <span className="text-super-small inline font-normal">{data.vehicleId}</span></p>
                        </>
                        :
                        <>
                            <div className="relative w-full">
                                <input onChange={(e) => {
                                    setName(e.target.value)
                                }} value={data.genre} type="text" id="floating_outlined1" className="block px-1 pb-1 pt-1 w-full text-super-small text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="floating_outlined1" className="font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    Name:{data.genre}</label>
                            </div>
                        </>
                }
            </div>
            <div className="w-full flex flex-1 items-center">
                {
                    type === "adjust" &&
                    <button onClick={() => { setAdjust(prev => !prev) }} className="w-8 h-8 p-1 rounded-xl bg-blue-400 hover:bg-blue-500 flex justify-center items-center">
                        <img src={wrench} alt="" />
                    </button>
                }
            </div>
        </div>
    </>);
}

export default memo(TransportDetail);