import { useEffect, useState, useMemo } from "react"
import socket from "../socket"
import ParkingSlotsSlice, { parkingSlotChannelLinkName } from "../../redux/slices/ParkingSlotsSlice"
import { useSelector } from "react-redux"
import { ParkingSlotsStore } from "../../redux/selectors"
import { useDispatch } from "react-redux"
import useLoadingForSocket from "./useLoadingForSocket"

const useParkingSlotsSocket = () => {
    const dispatch = useDispatch<any>()
    const parkingSlots = useSelector(ParkingSlotsStore).parkingSlots
    const { handleLoading } = useLoadingForSocket()
    const [receiveData, setReceiveData] = useState(false)
    useEffect(() => {
        socket.on(parkingSlotChannelLinkName, (res: any) => {
            console.log(parkingSlots.length, res)
            if (res.status === "Success") {
                if (parkingSlots.length === 0) {
                    dispatch(ParkingSlotsSlice.actions.handleSetParkingSlots([...res.data]))
                    handleLoading(parkingSlotChannelLinkName, false)
                    return [...res.data]
                }
                else {
                    const updateParkingSlot = res.data[0]
                    let newArray = parkingSlots.map((item: any, index: number) => {
                        if (updateParkingSlot.parkingSlotId === item.parkingSlotId)
                            return updateParkingSlot
                        else return item
                    })
                    dispatch(ParkingSlotsSlice.actions.handleSetParkingSlots([...newArray]))
                    handleLoading(parkingSlotChannelLinkName, false)
                    return [...newArray]
                }
            }
            setReceiveData((prev) => !prev)
        })

        return () => {
            socket.off(parkingSlotChannelLinkName)
        }
    }, [receiveData])

    useEffect(() => {
        socket.emit(parkingSlotChannelLinkName, {
            "page": 0,
            "limit": 4
        })
        handleLoading(parkingSlotChannelLinkName, true)
    }, [])

    const value = useMemo(()=>{
        return parkingSlots
    },[parkingSlots])

    return value
}

export default useParkingSlotsSocket