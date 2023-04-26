import { memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx'
import { useDispatch } from 'react-redux';
import MenuSlice from '../../../redux/slices/MenuSlice';

function SidebarChild({ onNavigationTo, icon, iconOff, content }: {onNavigationTo:any, icon: any, iconOff:any, content:string }) {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<any>()
    return (<>
        <div onClick={()=>{navigate(`${onNavigationTo}`)
        dispatch(MenuSlice.actions.handleClose({}))
        }} className={clsx("gap-2 transition duration-200 ease-in-out hover:bg-gradient-sidebarChild m-3 group min-w-0 h-10 p-4 rounded-xl flex justify-between items-center", {
            "bg-gradient-sidebarChild": location.pathname === onNavigationTo,
            "cursor-pointer": location.pathname !== onNavigationTo,
        })}>
            <img src={iconOff} className={clsx("w-4 h-4 text-black group-hover:hidden",{
                "hidden": location.pathname === onNavigationTo,
                "block": location.pathname !== onNavigationTo
            })} />
            <img src={icon} className={clsx("w-4 h-4 bg-transparent text-black group-hover:block",{
                "block": location.pathname === onNavigationTo,
                "hidden": location.pathname !== onNavigationTo
            })} />
            <p className={clsx("text-gray-500 group-hover:text-white font-normal text-sm ",{
                "text-white": location.pathname === onNavigationTo
            })}>{content}</p>
        </div>
    </>);
}

export default memo(SidebarChild);