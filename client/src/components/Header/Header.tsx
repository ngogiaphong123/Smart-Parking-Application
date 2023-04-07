import {memo} from 'react'
import {useNavigate} from "react-router-dom"
import HeaderUser from '../HeaderUser/HeaderUser';

function Header({role, handleMenuOnClick, isMenuOpen }: {role:string, handleMenuOnClick: any, isMenuOpen:boolean }) {
    const navigate = useNavigate();
    return (<>
        <div onClick={()=>{navigate('/')}} className="cursor-pointer z-10 fixed top-0 left-0 right-0 header w-full px-8 h-16 bg-white flex justify-between items-center drop-shadow">
            <div className="logo text-2xl sm:text-4xl inline">Parking<p className="inline font-semibold">Auto</p>.com</div>
            <div className="hidden md:block">
            <HeaderUser role={role} isMenuOpen={isMenuOpen}/>
            </div>
            <div onClick={handleMenuOnClick} className="md:hidden flex items-center">
                <button type="button">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
    </>);
}

export default memo(Header);