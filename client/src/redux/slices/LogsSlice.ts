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
        // builder


    }
})

export default LogsSlice