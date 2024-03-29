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
                    state.revenue = action.payload.data.totalPay
                    // @ts-ignore
                    state.totalRecords = action.payload.data.logsCount
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
                    state.revenue = action.payload.data.totalPay
                    // @ts-ignore
                    state.totalRecords = action.payload.data.logsCount
                }
            })
            .addCase(customerGetLogs.pending, (state, action) => {
                state.loading = true
            })
            .addCase(customerGetLogs.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status === 'Success') {
                    // @ts-ignore
                    state.logs = action.payload.data.logs
                    // @ts-ignore
                    state.revenue = action.payload.data.totalPay
                    // @ts-ignore
                    state.totalRecords = action.payload.data.logsCount
                }
            })
            .addCase(customerGetLogsByVehicle.pending, (state, action) => {
                state.loading = true
            })

            .addCase(customerGetLogsByVehicle.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status === 'Success') {
                    // @ts-ignore
                    state.logs = action.payload.data.logs
                    // @ts-ignore
                    state.revenue = action.payload.data.totalPay
                    // @ts-ignore
                    state.totalRecords = action.payload.data.logsCount
                }
            })
    }
})

export const getLogs = createAsyncThunk('getLogs', async (input: any) => {
    try {
        let { data } = await axios.post(`${serverUrl}/log`, {
            "page": input.page,
            "limit": input.limit,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        });
        if (data.status === 'Success') {
            if (input.paidState) {
                data.data.logs = data.data.logs.filter((log: any) => {
                    if ((log.timeOut && input.paidState === "paid") || (!log.timeOut && input.paidState === "unpaid"))
                        return log
                })
                data.data.logsCount = data.data.logs.length
                let newTotalPay = 0;
                data.data.logs.forEach((log: any) => {
                    newTotalPay += parseInt(log.price)
                })
                data.data.totalPay = newTotalPay
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
                data.data.logsCount = data.data.logs.length
                let newTotalPay = 0;
                data.data.logs.forEach((log: any) => {
                    newTotalPay += parseInt(log.price)
                })
                data.data.totalPay = newTotalPay
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

export const customerGetLogs = createAsyncThunk('customerGetLogs', async (input: any) => {
    try {
        let { data } = await axios.post(`${serverUrl}/log/me`, input, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        },);
        if (data.status === 'Success') {
            if (input.paidState&&input.paidState!=="all") {
                data.data.logs = data.data.logs.filter((log: any) => {
                    if ((log.timeOut && input.paidState === "paid") || (!log.timeOut && input.paidState === "unpaid"))
                        return log
                })
                data.data.logsCount = data.data.logs.length
                let newTotalPay = 0;
                data.data.logs.forEach((log: any) => {
                    newTotalPay += parseInt(log.price)
                })
                data.data.totalPay = newTotalPay
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

export const customerGetLogsByVehicle = createAsyncThunk('customerGetLogsByVehicle', async (input: any) => {
    try {
        let { data } = await axios.post(`${serverUrl}/log/myVehicle`, input, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        });
        if (data.status === 'Success') {
            if (input.paidState&&input.paidState!=="all") {
                data.data.logs = data.data.logs.filter((log: any) => {
                    if ((log.timeOut && input.paidState === "paid") || (!log.timeOut && input.paidState === "unpaid"))
                        return log
                })
                data.data.logsCount = data.data.logs.length
                let newTotalPay = 0;
                data.data.logs.forEach((log: any) => {
                    newTotalPay += parseInt(log.price)
                })
                data.data.totalPay = newTotalPay
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