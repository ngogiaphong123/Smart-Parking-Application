import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'
import LightSensorSlice from './slices/LightSensorSlice'
import TemperatureSensorSlice from './slices/TemperatureSensorSlice'
import FanDeviceSlice from './slices/FanDeviceSlice';
import SocketSlice from './slices/SocketSlice';


const store = configureStore({
    reducer: {
        user:UserSlice.reducer,
        lightSensor : LightSensorSlice.reducer,
        temperatureSensor : TemperatureSensorSlice.reducer,
        fanDevice : FanDeviceSlice.reducer,
        socket: SocketSlice.reducer
    }
})

export default store
