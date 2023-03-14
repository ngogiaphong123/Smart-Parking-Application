import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'
import LightSensorSlice from './slices/LightSensorSlice'
import TemperatureSensorSlice from './slices/TemperatureSensorSlice'
import FanDeviceSlice from './slices/FanDeviceSlice';

const store = configureStore({
    reducer: {
        user:UserSlice.reducer,
        lightSensor : LightSensorSlice.reducer,
        temperatureSensor : TemperatureSensorSlice.reducer,
        FanDevice : FanDeviceSlice.reducer
    }
})

export default store
