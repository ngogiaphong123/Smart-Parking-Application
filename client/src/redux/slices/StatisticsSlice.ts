import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls';
import handleAxiosError from '../../utils/handleAxiosError';

const StatisticsSlice = createSlice({
    name:"StatisticsSlice",
    initialState:{
        logsLoading:false,
        logs:false,
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

export default StatisticsSlice