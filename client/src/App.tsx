import GeneralPage from './layouts/GeneralPage/GeneralPage';
import HomeAndParking from './pages/HomeAndParkingPage/HomeAndParkingPage';
import './index.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DashboardAdmin from './pages/DashboardAdminPage/DashboardAdminPage';
import TestGraph from './components/TestGraph/TestGraph';
import PaymentHistory from './pages/PaymentHistoryPage/PaymentHistoryPage';
import CustomersAndTransports from './pages/CustomersAndTransportsPage/CustomersAndTransportsPage';
import CustomerAnalytic from './components/ForAnalyticsPage/CustomerAnalytic/CustomerAnalytic';
import CustomerVehicleCard from './components/ForHomeAndParkingPage/CustomerVehicleCard/CustomerVehicleCard';
import OrderDetail from './components/OrderDetail/OrderDetail';
import LoginBackground from './layouts/Background/LoginBackground';
import LoginForm from './components/ForAuthenticationPage/LoginForm/LoginForm';
import SignUpForm from './components/ForAuthenticationPage/SignUpForm/SignUpForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ResponsiveSlice from './redux/slices/ResponsiveSlice';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import OrderModal from './components/ForHomeAndParkingPage/OrderModal/OrderModal';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

function App() {
  const location = useLocation()
  const dispatch = useDispatch<any>()
  useEffect(()=>{
    if (window.innerWidth < 1024) {
      dispatch(ResponsiveSlice.actions.responsiveYesHandle({ data: true }))
    }
    else {
      dispatch(ResponsiveSlice.actions.responsiveNoHandle({ data: false }))
    }
    function handleResponsive() {
      if (window.innerWidth < 1024) {
        dispatch(ResponsiveSlice.actions.responsiveYesHandle({ data: true }))
      }
      else {
        dispatch(ResponsiveSlice.actions.responsiveNoHandle({ data: false }))
      }
    }
    window.addEventListener('resize', handleResponsive)
    return () => {
      window.removeEventListener('resize', handleResponsive)
    }
  },[])
  return (
    <div className="w-full bg-sky-200 h-screen flex flex-col overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LoginBackground />} >
            <Route key="loginPage" path="" element={<LoginForm />} />
            <Route key="signupPage" path="signup" element={<SignUpForm />} />
            <Route key="loginPage" path="login" element={<LoginForm />} />
          </Route>
          <Route path="/admin" element={<GeneralPage />} >
            <Route path="" element={
                <HomeAndParking />
            } />
            <Route path="dashboard" element={
                <DashboardAdmin />
            } />
            <Route path="paymenthistory" element={
                <PaymentHistory />
            } />
            <Route path="customersandtransports" element={
                <CustomersAndTransports />
            } />
            <Route path="analytics" element={
                <AnalyticsPage />
            } />
          </Route>
          <Route path="/user" element={<GeneralPage />} >
            <Route path="" element={
                <HomeAndParking />
            } />
            <Route path="paymenthistory" element={
                <PaymentHistory />
            } />
            <Route path="profile" element={
                <UserProfilePage />
            } />
          </Route>

          {/* testing route */}
          <Route path="/testing" element={<OrderModal/>} />
          {/* testing route */}
          <Route path="/testing1" element={<OrderDetail />} />
        </Routes>
      </AnimatePresence>
      {/* <OrderDetail/> */}
      {/* <SignupPage/> */}
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
