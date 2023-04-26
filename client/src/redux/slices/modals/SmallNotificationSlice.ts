import {createSlice} from '@reduxjs/toolkit'

const SmallNotificationSlice = createSlice({
    name:"SmallNotificationSlice",
    initialState:{
        loading:false,
        show:false,
        type:"",
        content: ""
    },
    reducers:{
        // handleToggle
        handleOpen: (state, action) => {
            state.show = true;
            state.content = action.payload.content;
            state.type = action.payload.type;
        },
        handleClose: (state, action) => {
            state.show = false;
        }
    },
    extraReducers(builder) {
        // builder
    }
})

export default SmallNotificationSlice