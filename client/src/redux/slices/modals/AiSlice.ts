import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import serverUrl from '../../urls/urls';
const AiSlice = createSlice({
    name: "AiSlice",
    initialState: {
        loading: false,
        show: false,
        chatRoomShow: false,
        currMess: "",
        chats: [],
        AiLoading: false
        // type:"",
        // content: ""
    },
    reducers: {
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
        builder
            .addCase(AiAnswerHandle.pending, (state, action) => {
                state.AiLoading = true
                // @ts-ignore
                state.chats = [...state.chats, {
                    type: "left",
                    message: "loading"
                }]
            })
            .addCase(AiAnswerHandle.fulfilled, (state, action) => {
                state.AiLoading = false
                if (action.payload.status === 'Success') {
                    // delete last one first which is loading signal
                    // @ts-ignore
                    state.chats.pop();
                    // @ts-ignore
                    state.chats = [...state.chats, {
                        type: "left",
                        message: action.payload.message
                    }]
                    state.currMess = "";
                }
                else {
                    // @ts-ignore
                    state.chats.pop();
                    // @ts-ignore
                    state.chats = [...state.chats, {
                        type: "left",
                        message: action.payload.message
                    }]
                    state.currMess = "";
                }
            })
    }
})

export const AiAnswerHandle = createAsyncThunk("AiAnswerHandle", async (message: string) => {
    try {
        const { data } = await axios.post(`${serverUrl}/aiservice/aiAnswer`, {
            "fromHuman": message
        });
        console.log(data)
        if (data.status === 'Success') {
            return { status: 'Success', message: data.message, outputIndex: data.outputIndex };
        }
        else {
            return { status: 'Error', message: "I don't understand what you mean", outputIndex: -1 };
        }
    }
    catch (err) {
        return { status: 'Error', message: "I don't understand what you mean", outputIndex: -1 };
    }
})

export default AiSlice