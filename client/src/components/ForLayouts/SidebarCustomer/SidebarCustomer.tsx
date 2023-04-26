import {memo} from 'react'
import tagUser from '../../../assets/icon/tag-user.svg'
import tagUserOff from '../../../assets/icon/tag-user-off.svg'
import payment from '../../../assets/icon/payment.svg'
import paymentOff from '../../../assets/icon/payment-off.svg'
import user from '../../../assets/icon/user.svg'
import userOff from '../../../assets/icon/user-off.svg'
import review from '../../../assets/icon/review.svg'
import reviewOff from '../../../assets/icon/review-off.svg'
import SidebarChild from '../SidebarChild/SidebarChild';

function SidebarCustomer() {
    return ( <>
        <div className="w-60 mt-8 p-4 min-h-20 rounded-xl bg-gradient-sidebar flex flex-col items-center">
            <SidebarChild onNavigationTo={'/user'} content="Car Parking" icon={tagUser} iconOff={tagUserOff}/>
            <SidebarChild onNavigationTo={'/user/paymenthistory'} content="Payments History" icon={payment} iconOff={paymentOff}/>
            <SidebarChild onNavigationTo={'/user/profile'} content="User" icon={user} iconOff={userOff}/>
            {/* <SidebarChild onNavigationTo={''} content="Review" icon={review} iconOff={reviewOff}/> */}
        </div>
    </> );
}

export default memo(SidebarCustomer);