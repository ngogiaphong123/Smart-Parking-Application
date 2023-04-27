import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls'

const TemperatureSensorSlice = createSlice({
    name:"TemperatureSensorSlice",
    initialState:{
        loading:false,
        data:false,
    },
    reducers:{
    },
    extraReducers(builder) {
        // builder
        // .addCase(getTemperatureRecord.pending, (state,action) => {
        //     state.loading = true
        // })
        // .addCase(getTemperatureRecord.fulfilled, (state,action) => {
        //     state.loading = false
        //     const {data} = action.payload
        //     state.data = data
        // })
    }
})

// example
// import {useDispatch, useSelector} from 'react-redux'
// import {checkMe} from '../redux/slices/TemperatureSensorSlice'
// import {UserStore} from '../redux/selectors'
//
// using
// const dispatch = useDispatch()
// const user = useSelector(UserStore)
// useEffect(() => {
    // dispatch with response
    // dispatch(checkMe()).then((res:any) => {
    //     console.log(res)
    // })
// },[])
//

// export const checkMe = createAsyncThunk('checkMe', async () => {
//     //{{host}}/api/users/me.php
//     try {
//         const {data} = await axios.get(`${serverUrl}/api/users/meAccount.php`,{
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         if(data.status === 'success'){
//             return {status:"success","data":data.data.user, "msg":data.data.msg};
//         }
//         else {
//             return {status:"error", "data":data.data.user,"msg":data.data.msg};
//         }
//     }
//     catch (error : any) {
//         return {status:"error","msg":error.response.data.message};
//     }
// }
// )

// export const getTemperatureRecord = createAsyncThunk('getTemperatureRecord', async (input:any) => {
//     try {
//         const {page, limit} = input
//         const {data} = await axios.get(`${serverUrl}/sensors/temperature?page=${page}&limit=${limit}`)
//         if(data.status === "200") {
//             return {message:data.message, "data":data.data};
//         }
//         else {
//             return {message:data.message, "data":data.data};
//         }
//     }
//     catch (error : any) {
//         return {message:error.response.data.message, "data":error.response.data.data};
//     }
// })

// name of link for socket
export const temperatureChannelLinkName = "temperature-channel" 
export default TemperatureSensorSlice   