import {createSlice} from '@reduxjs/toolkit'

const OrderModalSlice = createSlice({
    name:"OrderModalSlice",
    initialState:{
        loading:false,
        data:false,
    },
    reducers:{
        handleOpen(state,action) {
            state.data = true
        },
        handleClose(state,action) {
            state.data = false
        }
    },
    extraReducers(builder) {
    }
})


export default OrderModalSlice