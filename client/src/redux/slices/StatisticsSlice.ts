import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls';
import handleAxiosError from '../../utils/handleAxiosError';

const StatisticsSlice = createSlice({
    name:"StatisticsSlice",
    initialState:{
        logsLoading:false,
        logs:false,
        piechartLoading:false,
        piechart:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(logsPerHour.pending, (state,action) => {
            state.logsLoading = true
        })
        .addCase(logsPerHour.fulfilled, (state,action) => {
            state.logsLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.logs = action.payload.data
            }
        })
        .addCase(logsPerDay.pending, (state,action) => {
            state.logsLoading = true
        })
        .addCase(logsPerDay.fulfilled, (state,action) => {
            state.logsLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.logs = action.payload.data
            }
        }
        )
        .addCase(logsPerWeek.pending, (state,action) => {
            state.logsLoading = true
        })
        .addCase(logsPerWeek.fulfilled, (state,action) => {
            state.logsLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.logs = action.payload.data
            }
        })
        .addCase(logsPerHourCustomer.pending, (state,action) => {
            state.logsLoading = true
        })
        .addCase(logsPerHourCustomer.fulfilled, (state,action) => {
            state.logsLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.logs = action.payload.data
            }
        })
        .addCase(logsPerDayCustomer.pending, (state,action) => {
            state.logsLoading = true
        })
        .addCase(logsPerDayCustomer.fulfilled, (state,action) => {
            state.logsLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.logs = action.payload.data
            }
        })
        .addCase(logsPerWeekCustomer.pending, (state,action) => {
            state.logsLoading = true
        })
        .addCase(logsPerWeekCustomer.fulfilled, (state,action) => {
            state.logsLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.logs = action.payload.data
            }
        })
        .addCase(piechartDetailInDay.pending, (state,action) => {
            state.piechartLoading = true
        })
        .addCase(piechartDetailInDay.fulfilled, (state,action) => {
            state.piechartLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.piechart = action.payload.data
            }
        })
        .addCase(piechartDetailInWeek.pending, (state,action) => {
            state.piechartLoading = true
        })
        .addCase(piechartDetailInWeek.fulfilled, (state,action) => {
            state.piechartLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.piechart = action.payload.data
            }
        })
        .addCase(piechartDetailInMonth.pending, (state,action) => {
            state.piechartLoading = true
        })
        .addCase(piechartDetailInMonth.fulfilled, (state,action) => {
            state.piechartLoading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.piechart = action.payload.data
            }
        })
    }
})

export const logsPerHour = createAsyncThunk('logsPerHour', async (input:{
    start:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/logPerHour`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const logsPerDay = createAsyncThunk('logsPerDay', async (input:{
    start:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/logPerDay`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const logsPerWeek = createAsyncThunk('logsPerWeek', async (input:{
    start:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/logPerWeek`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const logsPerHourCustomer = createAsyncThunk('logsPerHourCustomer', async (input:{
    start:string
    ,accountId:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/customer/logPerHour`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const logsPerDayCustomer = createAsyncThunk('logsPerDayCustomer', async (input:{
    start:string
    ,accountId:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/customer/logPerDay`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const logsPerWeekCustomer = createAsyncThunk('logsPerWeekCustomer', async (input:{
    start:string
    ,accountId:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/customer/logPerWeek`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const piechartDetailInDay = createAsyncThunk('piechartDetailInDay', async (input:{
    start:string
    ,accountId:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/customer/logVehicleDay`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const piechartDetailInWeek = createAsyncThunk('piechartDetailInWeek', async (input:{
    start:string
    ,accountId:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/customer/logVehicleWeek`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const piechartDetailInMonth = createAsyncThunk('piechartDetailInMonth', async (input:{
    start:string
    ,accountId:string
}) => {
    try {
        const {data} = await axios.post(`${serverUrl}/statistic/customer/logVehicleMonth`,input);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})


export default StatisticsSlice