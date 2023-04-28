import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
import serverUrl from '../urls/urls';
import handleAxiosError from '../../utils/handleAxiosError';

const ParkingSlotsSlice = createSlice({
    name:"ParkingSlotsSlice",
    initialState:{
        loading:false,
        parkingSlots:[],
    },
    reducers:{
        handleSetParkingSlots(state, action){
            state.parkingSlots = action.payload
        },
    },
    extraReducers(builder) {
        // builder


    }
})

export const parkingSlotChannelLinkName = "parking-slot-channel"
export default ParkingSlotsSlice