import GeneralPageAdmin from './components/GeneralPageAdmin/GeneralPageAdmin';
import HomeAndParkingAdmin from './pages/HomeAndParkingAdmin/HomeAndParkingAdmin';
import './index.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AnimatePresence } from 'framer-motion';
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin';
import TestGraph from './components/TestGraph/TestGraph';
import { io } from 'socket.io-client';
import serverUrl from './redux/urls/urls';
import { useEffect, useState } from 'react';

const socket = io(serverUrl)

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const location = useLocation()
  useEffect(()=>{
    socket.on('connected',()=>{
      setIsConnected(true)
    })
    socket.on('disconnected',()=>{
      setIsConnected(false)
    })
    if(isConnected)
    socket.emit("temperature-channel",{page:10,limit:10})
  },[isConnected])
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
