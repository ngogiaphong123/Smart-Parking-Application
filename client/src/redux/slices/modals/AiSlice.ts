import {createSlice} from '@reduxjs/toolkit'

const AiSlice = createSlice({
    name:"AiSlice",
    initialState:{
        loading:false,
        show:false,
        chatRoomShow:false
        // type:"",
        // content: ""
    },
    reducers:{
        // handleToggle
        handleOpen: (state, action) => {
            state.show = true;
            // state.content = action.payload.content;
            // state.type = action.payload.type;
        },
        handleClose: (state, action) => {
            state.show = false;
        },
        handleChatRoomOpen: (state, action) => {
            state.chatRoomShow = true;
        },
        handleChatRoomClose: (state, action) => {
            state.chatRoomShow = false;
        },
    },
    extraReducers(builder) {
        // builder
    }
})

export default AiSlice