import GeneralPageAdmin from './components/GeneralPageAdmin/GeneralPageAdmin';
import HomeAndParkingAdmin from './pages/HomeAndParkingAdmin/HomeAndParkingAdmin';
import './index.css'

function App() {
  return (
    <div className="w-full bg-sky-200 h-screen flex flex-col overflow-x-hidden">
      <GeneralPageAdmin>
        <HomeAndParkingAdmin/>
      </GeneralPageAdmin>
        {/* <OrderDetail/> */}
      {/* <SignupPage/> */}
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
