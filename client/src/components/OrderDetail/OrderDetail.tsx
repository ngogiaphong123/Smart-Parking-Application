import { memo, useState, useEffect } from 'react'
import OrderModalSlice from '../../redux/slices/modals/OrderModalSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { OrderModalStore, UserStore } from '../../redux/selectors';
import TransportCard from '../ForCustomersAndTransportsPage/TransportCard/TransportCard';
import handleFindSlotNumFromVehicleId from '../../utils/handleFindSlotNumFromVehicleId';
import useParkingSlotsSocket from '../../utils/hooks/useParkingSlotsSocket';
import SmallNotificationSlice from '../../redux/slices/modals/SmallNotificationSlice';
import clsx from 'clsx';
import socket from '../../utils/socket';
import { reserveSlotChannelLinkName } from '../../redux/slices/ParkingSlotsSlice';
import useLoadingForSocket from '../../utils/hooks/useLoadingForSocket';
import Spinner from '../Spinner/Spinner';
function OrderDetail() {
    // const [minutes, setMinutes] = useState(180)
    const dispatch = useDispatch<any>()
    const parkingSlots = useParkingSlotsSocket()
    const parkingSlotData = useSelector(OrderModalStore).parkingSlotData
    const parkingSlotIndex = useSelector(OrderModalStore).parkingSlotIndex
    const [transport, setTransport] = useState<any>(false)
    const user = useSelector(UserStore).user
    const [receiveData, setReceiveData] = useState(false)
    const { reserveLoading, handleLoading } = useLoadingForSocket()
    // const convertHHMM = useCallback((minutes: number) => {
    //     const hours = Math.floor(minutes / 60);
    //     const mins = minutes % 60;
    //     return `${hours}h ${mins}m`;
    // }, [])
    useEffect(() => {
        socket.on(reserveSlotChannelLinkName, (res: any) => {
            if (res.status === "Success") {
                dispatch(SmallNotificationSlice.actions.handleOpen({ type: "success", content: "Reserve slot successfully" }))
                dispatch(OrderModalSlice.actions.handleClose({}))
                handleLoading(reserveSlotChannelLinkName, false)
            }
            else {
                dispatch(SmallNotificationSlice.actions.handleOpen({ type: "error", content: "Reserve slot failed" }))
            }
            setReceiveData(prev => !prev)
        })
        return () => {
            socket.off(reserveSlotChannelLinkName)
        }
    }, [receiveData])
    const handleReserve = () => {
        if (!transport) {
            dispatch(SmallNotificationSlice.actions.handleOpen({ type: "error", content: "Please choose a vehicle" }))
            return
        }

        socket.emit(reserveSlotChannelLinkName, {
            vehicleId: transport.vehicleId,
            parkingSlotId: parkingSlotData.parkingSlotId,
            accountId: user.accountId
        })

        handleLoading(reserveSlotChannelLinkName, true)
    }
    return (<>
        <div className="min-w-0 max-w-[600px] rounded-2xl drop-shadow-md flex flex-col bg-white p-4 light space-y-4">
            <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order detail
                </h3>
                <button
                    onClick={() => {
                        dispatch(OrderModalSlice.actions.handleClose({}))
                    }}
                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="w-full flex">
                <div className="w-full flex flex-col items-start gap-2">
                    {/* <label htmlFor="default-range" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Time before parking: {convertHHMM(minutes)}</label>
                    <input onChange={(e) => { setMinutes(parseInt(e.target.value)) }} id="default-range" type="range" min={1} max={360} value={minutes} step={1} className="group mt-2 mb-4 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" /> */}
                    <div className="w-full flex flex-col mt-4">
                        <div className="w-full h-full bg-blue-200 p-4 flex flex-col gap-4">
                            <span className={clsx("font-normal text-super-smal uppercase", {
                                "text-gray-500": transport === false,
                                "text-green-500": transport !== false
                            })}>{transport ? "Your vehicle: " + transport.numberPlate + ", " + transport.genre + ", " + transport.model : "Choose your vehicle"}</span>
                            {
                                transport &&
                                <span onClick={() => { setTransport(false) }} className="cursor-pointer font-semibold text-super-small text-blue-500 uppercase w-fit">Choose another ?</span>
                            }
                            {
                                transport === false ?
                                    (user.vehicles.length > 0 ?
                                        user.vehicles.map((vehicle: any, index: number) => {
                                            let check = handleFindSlotNumFromVehicleId(vehicle.vehicleId, parkingSlots)
                                            if (!check)
                                                return <TransportCard noAdjustSignal slot={null} data={vehicle} setTransport={setTransport} />
                                        })
                                        :
                                        <div className="w-full h-full flex justify-center items-center">
                                            <span className="font-normal text-super-small text-gray-500 uppercase">You don't have any vehicle</span>
                                        </div>)
                                    :
                                    <TransportCard noAdjustSignal slot={parkingSlotIndex + 1} data={transport} transport={transport} />
                            }
                            <span className="font-normal text-super-small text-gray-500 uppercase">parking price per hour</span>
                            <div className="flex justify-between">
                                <span className="font-bold text-super-small">Price: {parkingSlotData.pricePerHour}$/h</span>
                                <span className="font-bold text-super-small">Slot: {parkingSlotIndex + 1}</span>
                            </div>
                        </div>
                        <div className="w-full p-2 border-l-2 border-blue-500 bg-blue-300 flex items-center justify-between">
                            <span className="font-normal text-super-small text-gray-500 uppercase">Total</span>
                            <span className="font-bold text-super-small">${parkingSlotData.pricePerHour} x Your Parking Time</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-12 flex justify-center items-center">
                <div onClick={handleReserve} className="w-36 rounded-xl bg-blue-400 transition duration-150 hover:bg-blue-500 cursor-pointer h-8 text-white font-semibold flex justify-center items-center">
                    {
                    reserveLoading?
                    <Spinner/>
                    :
                    "Reserve"
                    }
                </div>
            </div>
        </div>
    </>);
}

export default memo(OrderDetail);