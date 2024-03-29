import {createSlice} from '@reduxjs/toolkit'

const OrderModalSlice = createSlice({
    name:"OrderModalSlice",
    initialState:{
        loading:false,
        show:false,
        parkingSlotData:false,
        parkingSlotIndex:false,
    },
    reducers:{
        handleOpen(state,action) {
            state.show = true
            state.parkingSlotData = action.payload.parkingSlotData
            state.parkingSlotIndex = action.payload.parkingSlotIndex
        },
        handleClose(state,action) {
            state.show = false
        }
    },
    extraReducers(builder) {
    }
})


export default OrderModalSlice