import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls';
import handleAxiosError from '../../utils/handleAxiosError';

const LogsSlice = createSlice({
    name:"LogsSlice",
    initialState:{
        loading:false,
        logs:false,
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getLogs.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getLogs.fulfilled, (state,action) => {
            state.loading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.logs = action.payload.data
            }
        }
        )
    }
})

export const getLogs = createAsyncThunk('getLogs', async () => {
    try {
        const {data} = await axios.post(`${serverUrl}/log`,{
            "page" : 0,
            "limit" : 10
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        },);
        if(data.status === 'Success'){
            return {status:"Success", "message":data.message, data:data.data};
        }
        else {
            return {status:"Error", "message":data.data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export default LogsSlice