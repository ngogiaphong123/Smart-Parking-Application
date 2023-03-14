import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'

const store = configureStore({
    reducer: {
        user:UserSlice.reducer,
    }
})

export default store
