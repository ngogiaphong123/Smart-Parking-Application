import {memo} from 'react'
import tagUser from '../../assets/icon/tag-user.svg'
import tagUserOff from '../../assets/icon/tag-user-off.svg'
import payment from '../../assets/icon/payment.svg'
import paymentOff from '../../assets/icon/payment-off.svg'
import customer from '../../assets/icon/customer.svg'
import customerOff from '../../assets/icon/customer-off.svg'
import analytic from '../../assets/icon/analytic.svg'
import analyticOff from '../../assets/icon/analytic-off.svg'
import dashboard from '../../assets/icon/dashboard.svg'
import dashboardOff from '../../assets/icon/dashboard-off.svg'
import chat from '../../assets/icon/chat.svg'
import chatOff from '../../assets/icon/chat-off.svg'
import settings from '../../assets/icon/settings.svg'
import settingsOff from '../../assets/icon/settings-off.svg'
import SidebarChild from '../SidebarChild/SidebarChild';

function SidebarAdmin() {
    return ( <>
        <div className="w-72 mt-8 p-4 min-h-20 rounded-xl bg-gradient-sidebar flex flex-col items-center">
            <SidebarChild onNavigationTo={"/admin"} content="Car Parking" icon={tagUser} iconOff={tagUserOff}/>
            <SidebarChild onNavigationTo={"/admin/dashboard"} content="Dashboard" icon={dashboard} iconOff={dashboardOff}/>
            <SidebarChild onNavigationTo={"/admin/paymenthistory"} content="Payments History" icon={payment} iconOff={paymentOff}/>
            <SidebarChild onNavigationTo={"/admin/customersandtransports"} content="Customers" icon={customer} iconOff={customerOff}/>
            {/* <SidebarChild onNavigationTo={""} content="Analytics" icon={analytic} iconOff={analyticOff}/>
            <SidebarChild onNavigationTo={""} content="AI Support" icon={chat} iconOff={chatOff}/>
            <SidebarChild onNavigationTo={""} content="Settings" icon={settings} iconOff={settingsOff}/> */}
        </div>
    </> );
}

export default memo(SidebarAdmin);