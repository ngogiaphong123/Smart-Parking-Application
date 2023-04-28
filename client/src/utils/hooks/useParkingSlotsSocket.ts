import {useEffect, useState} from "react"
import socket from "../socket"
import ParkingSlotsSlice, { parkingSlotChannelLinkName } from "../../redux/slices/ParkingSlotsSlice"
import { useSelector } from "react-redux"
import { ParkingSlotsStore } from "../../redux/selectors"
import { useDispatch } from "react-redux"

const useParkingSlotsSocket = () => {
    const dispatch = useDispatch<any>()
    const parkingSlots = useSelector(ParkingSlotsStore).parkingSlots
    const [receiveData, setReceiveData] = useState(false)
    useEffect(() => {
        socket.on(parkingSlotChannelLinkName, (res: any) => {
            if (res.status === "Success") {
                if (parkingSlots.length === 0) {
                    dispatch(ParkingSlotsSlice.actions.handleSetParkingSlots([...res.data]))
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
    }, [])

    return parkingSlots
}

export default useParkingSlotsSocket