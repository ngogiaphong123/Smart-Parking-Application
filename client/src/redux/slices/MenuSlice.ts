import {createSlice} from '@reduxjs/toolkit'

const MenuSlice = createSlice({
    name:"MenuSlice",
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


export default MenuSlice