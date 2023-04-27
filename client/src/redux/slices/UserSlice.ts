import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls';
import handleAxiosError from '../../utils/handleAxiosError';

const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        loading:false,
        user:false,
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(Login.pending, (state,action) => {
            state.loading = true
        })
        .addCase(Login.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(getMe.pending, (state,action) => {
            state.loading = true
        }
        )
        .addCase(getMe.fulfilled, (state,action) => {
            state.loading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.user = action.payload.data
            }
        })
        .addCase(logout.pending, (state,action) => {
            state.loading = true
        }
        )
        .addCase(logout.fulfilled, (state,action) => {
            state.loading = false
            if(action.payload.status === 'Success'){
                // @ts-ignore
                state.user = false
            }
        })


    }
})

export const Login = createAsyncThunk('Login', async (input : any) => {
    try {
        const {data} = await axios.post(`${serverUrl}/auth/login`,input);
        if(data.status === 'Success'){
            localStorage.setItem('accessToken', data.data.accessToken)
            localStorage.setItem('refreshToken', data.data.refreshToken)
            return {status:"Success", "message":data.message};
        }
        else {
            return {status:"Error", "message":data.message};
        }
    }
    catch (error : any) {
        return handleAxiosError(error)
    }
})

export const getMe = createAsyncThunk('getMe', async () => {
    try {
        const {data} = await axios.get(`${serverUrl}/auth/info`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        });
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

export const logout = createAsyncThunk('logout', async () => {
    try {
        const {data} = await axios.get(`${serverUrl}/auth/logout`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "x-refresh": localStorage.getItem('refreshToken')
            }
        });
        if(data.status === 'Success'){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
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

export default UserSlice