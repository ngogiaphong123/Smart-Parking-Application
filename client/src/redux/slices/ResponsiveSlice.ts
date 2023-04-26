import {createSlice} from '@reduxjs/toolkit'

const lgSize = 1024;

const ResponsiveSlice = createSlice({
    name:"ResponsiveSlice",
    initialState:{
        loading:false,
        data:window.innerWidth > lgSize ? true : false
    },
    reducers:{
        responsiveYesHandle: (state,action) => {
            state.data = action.payload.data
        },
        responsiveNoHandle: (state,action) => {
            state.data = action.payload.data
        }
    },
    extraReducers(builder) {

    }
})


export default ResponsiveSlice