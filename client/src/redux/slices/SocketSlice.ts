import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { io } from 'socket.io-client';
import serverUrl from '../urls/urls';

const socket = io(serverUrl);
const SocketSlice = createSlice({
    name:"SocketSlice",
    initialState:{
        loading:false,
        socket:socket
    },
    reducers:{
    },
    extraReducers(builder) {
        // builder
    }
})

export default SocketSlice