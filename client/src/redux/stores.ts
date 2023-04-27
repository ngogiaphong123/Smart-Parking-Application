import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'
import LightSensorSlice from './slices/LightSensorSlice'
import TemperatureSensorSlice from './slices/TemperatureSensorSlice'
import FanDeviceSlice from './slices/FanDeviceSlice';
import MenuSlice from './slices/MenuSlice';
import ResponsiveSlice from './slices/ResponsiveSlice';
import OrderModalSlice from './slices/modals/OrderModalSlice';
import SmallNotificationSlice from './slices/modals/SmallNotificationSlice';


const store = configureStore({
    reducer: {
        user:UserSlice.reducer,
        lightSensor : LightSensorSlice.reducer,
        temperatureSensor : TemperatureSensorSlice.reducer,
        fanDevice : FanDeviceSlice.reducer,
        menu: MenuSlice.reducer,
        responsive: ResponsiveSlice.reducer,
        orderModal: OrderModalSlice.reducer,
        smallNotificationModal: SmallNotificationSlice.reducer,
    }
})

export default store
