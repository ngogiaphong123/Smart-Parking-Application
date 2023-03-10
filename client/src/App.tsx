import GeneralPageAdmin from './components/GeneralPageAdmin/GeneralPageAdmin';
import HomeAndParkingAdmin from './pages/HomeAndParkingAdmin/HomeAndParkingAdmin';
import './index.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AnimatePresence } from 'framer-motion';
import Testing from './components/Testing/Testing';
import Testing2 from './components/Testing2/Testing2';
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin';
import TestGraph from './components/TestGraph/TestGraph';
import {useDispatch, useSelector} from 'react-redux'
import {getLightRecord} from './redux/slices/LightSensorSlice'
import {LightSensorSlice} from './redux/selectors'
import { useEffect } from 'react';
import { getFanStatus } from './redux/slices/FanDeviceSlice';

function App() {
  const location = useLocation()
  const dispatch = useDispatch<any>()
    const lightSensor = useSelector(LightSensorSlice)
    useEffect(()=>{
        dispatch(getLightRecord()).then((res:any)=>{
            console.log(res)
        })
        dispatch(getFanStatus()).then((res:any)=>{
            console.log(res)
        })
    },[])
  return (
    <div className="w-full bg-sky-200 h-screen flex flex-col overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/" element={
            <GeneralPageAdmin>
              <HomeAndParkingAdmin />
            </GeneralPageAdmin>
          } />
          <Route path="/admin/dashboard" element={
            <GeneralPageAdmin>
              <DashboardAdmin />
            </GeneralPageAdmin>
          } />

          {/* testing route */}
          <Route path="/testing" element={<TestGraph/>} />
        </Routes>
      </AnimatePresence>
      {/* <OrderDetail/> */}
      {/* <SignupPage/> */}
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
