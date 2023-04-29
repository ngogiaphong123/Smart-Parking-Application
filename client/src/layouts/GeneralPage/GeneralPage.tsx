import { memo, useState } from 'react'
import Header from '../../components/ForLayouts/Header/Header';
import MenuBar from '../../components/ForLayouts/MenuBar/MenuBar';
import SidebarAdmin from '../../components/ForLayouts/SidebarAdmin/SidebarAdmin';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarCustomer from '../../components/ForLayouts/SidebarCustomer/SidebarCustomer';
import OrderModal from '../../components/ForHomeAndParkingPage/OrderModal/OrderModal';
import { useSelector } from 'react-redux';
import { UserStore } from '../../redux/selectors';

function GeneralPage() {
    const user = useSelector(UserStore).user
    const location = useLocation()
    return (<>
        <MenuBar />
        <Header />
        {/* mt for Header 16 */}
        {/* Start coding body here */}
        <div className="w-full h-full mt-16 bg-sky-100 flex items-start">
            <div className="md:block hidden">
                {
                    user.role === 'admin' ? <SidebarAdmin /> : <SidebarCustomer />
                }
            </div>
            <div className="px-6 w-full h-full mt-8 flex items-start justify-center overflow-hidden pb-8">
                <Outlet />
            </div>
        </div>
        {
            user.role !== 'admin' && location.pathname.includes('/customer')  &&
            <OrderModal />
        }
    </>);
}

export default memo(GeneralPage);