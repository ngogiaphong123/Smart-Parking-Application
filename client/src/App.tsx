import { useState, useRef } from 'react';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import MenuBar from './components/MenuBar/MenuBar';
import clsx from 'clsx';
import SignUpForm from './components/SignUpForm/SignUpForm';
import StateNotification from './components/StateNotification/StateNotification';
import Sidebar from './components/Sidebar/Sidebar';
import ParkingSlotCard from './components/ParkingSlotCard/ParkingSlotCard';
import TemperatureCard from './components/TemperatureChart/TemperatureChart';
import CalendarForApp from './components/CalendarForApp/CalendarForApp';
import {AnimatePresence} from 'framer-motion';
import Background from './components/LoginBackground/LoginBackground';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DashboardToggle from './components/DashboardToggle/DashboardToggle';
import CustomerDetail from './components/CustomerDetail/CustomerDetail';

function App() {
  const menuRef = useRef<any>(null);
  function handleMenuOnClick() {
    menuRef.current.handleMenuOnClick();
  }
  return (
    <div className="w-full bg-sky-200 h-screen flex flex-col overflow-x-hidden">
      
      <MenuBar ref={menuRef}/>
      <Header handleMenuOnClick={handleMenuOnClick} isMenuOpen={menuRef.current?.isMenuOpen||false}/>
      {/* padding for Header 16 */}
      <div className="padding h-16 w-full bg-transparent"></div>
      {/* Start coding body here */}
      <SignUpForm/>
      {/* <SignupPage/> */}
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
