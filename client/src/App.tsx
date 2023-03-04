import { useState, useRef } from 'react';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import MenuBar from './components/MenuBar/MenuBar';
import clsx from 'clsx';
import SignUpForm from './components/SignUpForm/SignUpForm';
import StateNotification from './components/StateNotification/StateNotification';
import Sidebar from './components/Sidebar/Sidebar';
import ParkingSlotCard from './components/ParkingSlotCard/ParkingSlotCard';

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
      <ParkingSlotCard/>
      {/* <div classNameName="container mx-auto h-full bg-sky-200">

        </div> */}
      {/* <ParkingSlotCards/> */}
    </div>
  );
}

export default App;
