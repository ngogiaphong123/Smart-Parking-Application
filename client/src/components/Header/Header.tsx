import {memo} from 'react'
import HeaderUser from '../HeaderUser/HeaderUser';

function Header({ handleMenuOnClick, isMenuOpen }: {handleMenuOnClick: any, isMenuOpen:boolean }) {
    console.log("Header re-render ne")
    return (<>
        <div className="fixed top-0 left-0 right-0 header w-full px-8 h-16 bg-white flex justify-between items-center drop-shadow">
            <div className="logo text-2xl sm:text-4xl inline">Parking<p className="inline font-semibold">Auto</p>.com</div>
            <div className="hidden sm:block">
            <HeaderUser isMenuOpen={isMenuOpen}/>
            </div>
            <div onClick={handleMenuOnClick} className="sm:hidden flex items-center">
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