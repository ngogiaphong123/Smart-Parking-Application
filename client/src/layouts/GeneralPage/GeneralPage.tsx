import { memo, useState } from 'react'
import Header from '../../components/ForLayouts/Header/Header';
import MenuBar from '../../components/ForLayouts/MenuBar/MenuBar';
import SidebarAdmin from '../../components/ForLayouts/SidebarAdmin/SidebarAdmin';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarCustomer from '../../components/ForLayouts/SidebarCustomer/SidebarCustomer';
import OrderModal from '../../components/ForHomeAndParkingPage/OrderModal/OrderModal';

function GeneralPage() {
    const [role, setRole] = useState<string>('admin')
    const location = useLocation()
    return (<>
        <MenuBar />
        <Header />
        {/* mt for Header 16 */}
        {/* Start coding body here */}
        <div className="w-full mt-16 flex items-start">
            <div className="md:block hidden">
                {
                    role === 'admin' ? <SidebarAdmin /> : <SidebarCustomer />
                }
            </div>
            <div className="px-6 w-full  mt-8 flex items-start justify-center overflow-hidden">
                <Outlet />
            </div>
        </div>
        {
            role !== 'admin' && location.pathname === '/user' &&
            <OrderModal />
        }
    </>);
}

export default memo(GeneralPage);