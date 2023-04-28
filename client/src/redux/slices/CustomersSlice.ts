import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls';
import handleAxiosError from '../../utils/handleAxiosError';

const CustomersSlice = createSlice({
    name: "CustomersSlice",
    initialState: {
        loading: false,
        customers: false,
        customer: false
    },
    reducers: {
        handleChooseCustomer: (state, action) => {
            state.customer = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getCustomers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status === 'Success') {
                    // @ts-ignore
                    state.customers = action.payload.data
                }
            })
    }
})

export const getCustomers = createAsyncThunk('getCustomers', async (input: any) => {
    try {
        let { data } = await axios.post(`${serverUrl}/customer`, input, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        },);
        if (data.status === 'Success') {
            // if (input.paidState) {
            //     data.data.logs = data.data.logs.filter((log: any) => {
            //         if ((log.timeOut && input.paidState === "paid") || (!log.timeOut && input.paidState === "unpaid"))
            //             return log
            //     })
            //     data.data.totalRecords = data.data.logs.length
            //     data.data.revenue = data.data.logs.reduce((item:any)=>{
            //         return item.price + item.price
            //     },0)
            // }
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

export default CustomersSlice