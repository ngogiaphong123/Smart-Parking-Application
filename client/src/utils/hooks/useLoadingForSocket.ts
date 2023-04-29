import { useState, useCallback, useMemo } from 'react'
import { reserveSlotChannelLinkName } from '../../redux/slices/ParkingSlotsSlice'
import { parkingSlotChannelLinkName } from '../../redux/slices/ParkingSlotsSlice'

const useLoadingForSocket = () => {
    const [reserveLoading, setReserveLoading] = useState(false)
    const [parkingSlotsLoading, setParkingSlotsLoading] = useState(false)

    const handleLoading = useCallback((eventName:string, signal:boolean) => {
        if(eventName===reserveSlotChannelLinkName)
        {
            setReserveLoading(signal)
        }
        else if(eventName===parkingSlotChannelLinkName)
        {
            setParkingSlotsLoading(signal)
        }
    },[])

    const value = useMemo(()=>{
        return {reserveLoading, parkingSlotsLoading, handleLoading}
    },[reserveLoading, parkingSlotsLoading, handleLoading])

    return value
}

export default useLoadingForSocket