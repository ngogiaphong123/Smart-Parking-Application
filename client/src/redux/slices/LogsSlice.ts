import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls';
import handleAxiosError from '../../utils/handleAxiosError';

const LogsSlice = createSlice({
    name: "LogsSlice",
    initialState: {
        loading: false,
        logs: false,
        revenue: false,
        totalRecords: false
    },
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(getLogs.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getLogs.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status === 'Success') {
                    // @ts-ignore
                    state.logs = action.payload.data.logs
                    // @ts-ignore
                    state.revenue = action.payload.data.revenue
                    // @ts-ignore
                    state.totalRecords = action.payload.data.totalRecords
                }
            })
            .addCase(getLogsDate.pending, (state, action) => {
                state.loading = true
            }
            )
            .addCase(getLogsDate.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status === 'Success') {
                    // @ts-ignore
                    state.logs = action.payload.data.logs
                    // @ts-ignore
                    state.revenue = action.payload.data.revenue
                    // @ts-ignore
                    state.totalRecords = action.payload.data.totalRecords
                }
            })
    }
})

export const getLogs = createAsyncThunk('getLogs', async (input: any) => {
    try {
        let { data } = await axios.post(`${serverUrl}/log`, input, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        },);
        if (data.status === 'Success') {
            if (input.paidState) {
                data.data.logs = data.data.logs.filter((log: any) => {
                    if ((log.timeOut && input.paidState === "paid") || (!log.timeOut && input.paidState === "unpaid"))
                        return log
                })
                data.data.totalRecords = data.data.logs.length
                data.data.revenue = data.data.logs.reduce((item:any)=>{
                    return item.price + item.price
                },0)
            }
            return { status: "Success", "message": data.message, data: data.data };
        }
        else {
            return { status: "Error", "message": data.data.message };
        }
    }
    catch (error: any) {
        return handleAxiosError(error)
    }
})

export const getLogsDate = createAsyncThunk('getLogsDate', async (input: any) => {
    try {
        let { data } = await axios.post(`${serverUrl}/log/date`, input, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        },);
        if (data.status === 'Success') {
            if (input.paidState) {
                data.data.logs = data.data.logs.filter((log: any) => {
                    if ((log.timeOut && input.paidState === "paid") || (!log.timeOut && input.paidState === "unpaid"))
                        return log
                })
                data.data.totalRecords = data.data.logs.length
                data.data.revenue = data.data.logs.reduce((item:any)=>{
                    return item.price + item.price
                },0)
            }
            return { status: "Success", "message": data.message, data: data.data };
        }
        else {
            return { status: "Error", "message": data.data.message };
        }
    }
    catch (error: any) {
        return handleAxiosError(error)
    }
})

export default LogsSlice