import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { UserStore } from '../../redux/selectors'
import { customerGetLogs, customerGetLogsByVehicle, getLogs, getLogsDate } from '../../redux/slices/LogsSlice'

const useGetLogs = ({paidState, currPage, date, setTotalPage, vehicle}:{paidState:string, currPage:number, date?:any, setTotalPage:any, vehicle?:any}) => {
    const dispatch = useDispatch<any>()
    const user = useSelector(UserStore).user
    useEffect(() => {
        if (user.role === "admin")
            if(paidState==="unpaidWithNoDate"){
                dispatch(getLogs({
                    "page": currPage - 1,
                    "limit": 8,
                    "paidState": "unpaid"
                }))
                    .then((res: any) => {
                        setTotalPage(Math.ceil(res.payload.data.totalRecords / 8))
                    })
            }
            else if (paidState !== "all")
                dispatch(getLogsDate({
                    "start": date.start,
                    "end": date.end,
                    "page": currPage - 1,
                    "limit": 8,
                    "paidState": paidState
                }))
                    .then((res: any) => {
                        setTotalPage(Math.ceil(res.payload.data.totalRecords / 8))
                    })
            else {
                dispatch(getLogs({
                    "page": currPage - 1,
                    "limit": 8,
                }))
                    .then((res: any) => {
                        setTotalPage(Math.ceil(res.payload.data.totalRecords / 8))
                    })
                }
        else {
            if(vehicle)
            dispatch(customerGetLogsByVehicle({
                "vehicleId": vehicle.vehicleId,
                "page": currPage - 1,
                "limit": 8,
                "paidState": paidState
            }))
                .then((res: any) => {
                    setTotalPage(Math.ceil(res.payload.data.totalRecords / 8))
                })
            else
            dispatch(customerGetLogs({
                "page": currPage - 1,
                "limit": 8,
                "paidState": paidState
            }))
                .then((res: any) => {
                    setTotalPage(Math.ceil(res.payload.data.totalRecords / 8))
                })
        }
    }, [currPage, paidState, date, vehicle])
}

export default useGetLogs