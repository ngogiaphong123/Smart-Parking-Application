import GeneralPageAdmin from './components/GeneralPageAdmin/GeneralPageAdmin';
import HomeAndParkingAdmin from './pages/HomeAndParkingAdmin/HomeAndParkingAdmin';
import './index.css'
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <div className="w-full bg-sky-200 h-screen flex flex-col overflow-x-hidden">
      <AnimatePresence>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/home" element={
            <GeneralPageAdmin>
              <HomeAndParkingAdmin />
            </GeneralPageAdmin>
          } />
        </Routes>
      </AnimatePresence>
      {/* <OrderDetail/> */}
      {/* <SignupPage/> */}
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
