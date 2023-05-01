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
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveSlice from './redux/slices/ResponsiveSlice';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import OrderModal from './components/ForHomeAndParkingPage/OrderModal/OrderModal';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import { AiStore, SmallNotificationStore, UserStore } from './redux/selectors';
import Notification from './components/Notification/Notification';
import CheckMe from './middlewares/CheckMe';
import Loggedin from './middlewares/Loggedin';
import AdminOnly from './middlewares/AdminOnly';
import CustomerOnly from './middlewares/CustomerOnly';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SmallNotification from './components/SmallNotification/SmallNotification';
import AiFloatingBubble from './components/AIComponents/AiFloatingBubble';
// import useLittleAi from './littleAi/useLittleAi';

function App() {
  const location = useLocation()
  const dispatch = useDispatch<any>()
  const user = useSelector(UserStore).user
  const AiIsOn = useSelector(AiStore).show
  const smallNotificationIsShow = useSelector(SmallNotificationStore).show
  console.log("re render")
  useEffect(() => {
    // change web name
    document.title = "Smart Parking Auto"
    // dispatch(Login({ email: "phong@gmail.com", password: "123456" }))
    // .then((res:any)=>{
    //   if(res.payload.status==="Success") 
    //   {
    // dispatch(getMe())
    //     .then((res:any)=>{
    //       console.log(res)
    //       console.log(user)
    //     })
    //   }
    // })
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
  }, [])
  return (
    <div className="w-full bg-white h-[100%] min-h-screen flex flex-col overflow-x-hidden">
      <AnimatePresence mode="wait">
        {
          smallNotificationIsShow &&
          <SmallNotification />
        }
        {
          user&& user.role==="admin"&&AiIsOn &&
          <AiFloatingBubble />
        }
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="" element={<CheckMe />}>
            <Route path="" element={<Loggedin />}>
              <Route path="/" element={<LoginBackground />} >
                <Route key="loginPage" path="" element={<LoginForm />} />
                <Route key="signupPage" path="signup" element={<SignUpForm />} />
                <Route key="loginPage" path="login" element={<LoginForm />} />
              </Route>
            </Route>

            <Route path="" element={<AdminOnly />} >
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
            </Route>
            <Route path="" element={<CustomerOnly />} >
              <Route path="/customer" element={<GeneralPage />} >
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
            </Route>


            {/* testing route */}
            <Route path="/testing" element={<OrderModal />} />
            {/* testing route */}
            <Route path="/testing1" element={<OrderDetail />} />
            <Route path="/notification" element={<LoginBackground />} >
              <Route path="" element={
                <div className="w-full h-full flex justify-center pt-32">
                  <Notification />
                </div>
              } />
            </Route>
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
      {/* <OrderDetail/> */}
      {/* <SignupPage/> */}
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
