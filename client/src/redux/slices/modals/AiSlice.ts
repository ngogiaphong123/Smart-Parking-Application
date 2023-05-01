import {createSlice} from '@reduxjs/toolkit'

const AiSlice = createSlice({
    name:"AiSlice",
    initialState:{
        loading:false,
        show:false,
        chatRoomShow:false,
        currMess:"",
        chats:[]
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
        handleCurrMess: (state, action) => {
            state.currMess = action.payload;
        },
        handleSendMess: (state, action) => {
            // @ts-ignore
            state.chats = [...state.chats, {
                type: action.payload.type,
                message: state.currMess
            }]
            state.currMess = "";
        },
    },
    extraReducers(builder) {
        // builder
    }
})

export default AiSlice