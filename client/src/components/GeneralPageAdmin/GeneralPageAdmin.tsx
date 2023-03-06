import { memo, useRef, useCallback } from 'react'
import Header from '../Header/Header';
import MenuBar from '../MenuBar/MenuBar';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';

function GeneralPageAdmin({ children }: { children?: any }) {
    const menuRef = useRef<any>(null);
    const handleMenuOnClick = useCallback(() => {
        menuRef.current.handleMenuOnClick();
    }, [])
    return (<>
        <MenuBar role="admin" ref={menuRef} />
        <Header role="admin" handleMenuOnClick={handleMenuOnClick} isMenuOpen={menuRef.current?.isMenuOpen || false} />
        {/* mt for Header 16 */}
        {/* Start coding body here */}
        <div className="w-full mt-16 flex items-start">
            <div className="md:block hidden">
            <SidebarAdmin />
            </div>
            <div className="px-6 w-full  mt-8 flex items-start justify-center overflow-hidden">
                {
                    children
                }
            </div>
        </div>
    </>);
}

export default memo(GeneralPageAdmin);