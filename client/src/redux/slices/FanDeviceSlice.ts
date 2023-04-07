import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls'
const FanDeviceSlice = createSlice({
    name:"FanDeviceSlice",
    initialState:{
        loading:false,
        data:false,
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getFanStatus.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getFanStatus.fulfilled, (state,action) => {
            state.loading = false
            const {data} = action.payload
            state.data = data
        })
        
        .addCase(manageFan.pending, (state,action) => {
            state.loading = true
        })
        .addCase(manageFan.fulfilled, (state,action) => {
            state.loading = false
            const {data} = action.payload
            state.data = data
        })

    }
})

// example
// import {useDispatch, useSelector} from 'react-redux'
// import {checkMe} from '../redux/slices/FanDeviceSlice'
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

export const manageFan = createAsyncThunk('manageFan', async (input:any) => {
    try {
        const {value}=input
        const {data} = await axios.post(`${serverUrl}/devices/fan/manage`,{
            value : value
        })
        if(data.status === "200") {
            return {message:data.message, "data":data.data};
        }
        else {
            return {message:data.message, "data":data.data};
        }
    }
    catch (error : any) {
        return {message:error.response.data.message, "data":error.response.data.data};
    }
})
export const getFanStatus = createAsyncThunk('getFanStatus', async () => {
    try {
        const {data} = await axios.get(`${serverUrl}/devices/fan/status`)
        if(data.status === "200") {
            return {message:data.message, "data":data.data};
        }
        else {
            return {message:data.message, "data":data.data};
        }
    }
    catch (error : any) {
        return {message:error.response.data.message, "data":error.response.data.data};
    }
})

// fan socket link name for first get fan status
export const fanSocketStatus = "fan-status"
// fan socket link name for control fan status
export const fanSocketControl = "fan-control"

export default FanDeviceSlice