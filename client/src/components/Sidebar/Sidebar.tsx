import {memo} from 'react'
import SidebarChild from '../SidebarChild/SidebarChild';

function Sidebar() {
    return ( <>
        <div className="w-52 mt-8 p-4 min-h-20 rounded-xl bg-gradient-sidebar flex flex-col items-center">
            <SidebarChild/>
            <SidebarChild/>
            <SidebarChild/>
            <SidebarChild/>
        </div>
    </> );
}

export default memo(Sidebar);