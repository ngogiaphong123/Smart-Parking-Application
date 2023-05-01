import {memo} from 'react'
import {useNavigate} from "react-router-dom"
import HeaderUser from '../HeaderUser/HeaderUser';
import { useDispatch } from 'react-redux';
import MenuSlice from '../../../redux/slices/MenuSlice';
import { useSelector } from 'react-redux';
import { UserStore } from '../../../redux/selectors';
import parking_header from "../../../assets/HeaderLogo/parking_header.png"
import AiHeaderButton from '../../AIComponents/AiHeaderButton';
function Header() {
    const user = useSelector(UserStore).user
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    return (<>
        <div className=" z-10 fixed top-0 left-0 right-0 header w-full px-4 sm:px-8 h-16 bg-white flex justify-between items-center drop-shadow">
            <div onClick={()=>{
                    if(user.role==="admin")
                        navigate("/admin")
                    else
                        navigate("/customer")
                }}  className="cursor-pointer w-fit h-fit flex justify-center items-center">
                <img src={parking_header} alt="" className="w-6 sm:w-10 h-6 sm:h-10"/>
                <div className="logo text-xl sm:text-4xl inline">Parking<p className="inline font-semibold">Auto</p>.com</div>
                <div className="hidden md:block w-fit">
            </div>
            </div>
            {
                user.role==="admin" &&
                <AiHeaderButton/>
            }
            <div className="w-fit h-fit hidden md:block">
                <HeaderUser/>
            </div>
            <div onClick={()=>{
                dispatch(MenuSlice.actions.handleOpen({}))
            }} className="md:hidden flex items-center ">
                <button type="button" className=" w-12 h-12 hover:bg-gray-hover focus:ring-gray-300 focus:ring-2 flex justify-center items-center rounded-xl ">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
    </>);
}

export default memo(Header);