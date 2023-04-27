import { memo, useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx';
import { MenuStore } from '../../../redux/selectors';
import { useSelector } from 'react-redux';
import { UserStore } from '../../../redux/selectors';
import Spinner from '../../Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/UserSlice';
import SmallNotificationSlice from '../../../redux/slices/modals/SmallNotificationSlice';

function HeaderUser() {
    const user = useSelector(UserStore).user
    const userLoading = useSelector(UserStore).loading
    const menuIsShow = useSelector(MenuStore).data
    const dispatch = useDispatch<any>() 
    const navigate = useNavigate()
    const [isAvatarClickedOutside, setIsAvatarClickedOutside] = useState(true)
    const myRef = useRef<any>(null);
    const handleAvatarClickOutside = (e: any) => {
        if (!myRef.current.contains(e.target)) {
            setIsAvatarClickedOutside(true);
        }
    };
    const handleAvatarClickInside = () => setIsAvatarClickedOutside(false);
    const handleLogout = () => {
        dispatch(logout())
        .then((res:any)=>{
            if(res.payload.status === "Success"){
                navigate("/notification", {
                    state: {
                        type: "success",
                        message: "Logout successfully",
                        link: "/"
                    }
                })
            }
            else {
                dispatch(SmallNotificationSlice.actions.handleOpen({type:"error", content:"Logout failed"}))
            }
        })
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleAvatarClickOutside);
        return () => document.removeEventListener('mousedown', handleAvatarClickOutside);
    });
    return (<>
        <div className="w-fit items-center justify-between flex space-x-4">
            <div className="w-10 h-10 bg-neutral-200 rounded-xl flex justify-center items-center drop-shadow">
                <FontAwesomeIcon icon={faBell as IconProp} className='w-6 h-6 text-gray-500' />
            </div>
            <div className="flex justify-center items-center w-10 h-10">
                <img src={user.avatarUrl} className="w-full h-full rounded-full" />
            </div>
            <div onClick={() => {
                handleAvatarClickInside()
            }} className="relative hover:bg-gray-hover  cursor-pointer flex w-44 rounded-xl items-center justify-between border-solid border-1 border-gray-200 overflow-hidden max-h-14">
                <div className="flex w-full items-center justify-center px-2 md:px-4">
                    <div className="flex flex-col items-center">
                        <p className="semibold text-gray-600" style={{ fontSize: 12 }}>{user.role === "admin" ? "Administrator" : "Customer"}</p>
                        <p style={{ fontSize: 12, color: "#bdbdbd" }}>ID: {user.accountId.substring(0, 5) + "..."}</p>
                    </div>
                    {
                        <div ref={myRef} className={"pl-4"}>
                            <FontAwesomeIcon icon={faChevronDown as IconProp} className={clsx("text-gray-500 ", {
                                "text-sky-300": !isAvatarClickedOutside
                            })} />
                        </div>
                    }
                </div>
            </div>
            <div className={clsx("transition duration-200 ease-in-out absolute bg-white top-full right-8 w-44 h-16 rounded-xl drop-shadow p-8 flex justify-center items-center", {
                "opacity-0": isAvatarClickedOutside
            })}>
                <div className="z-0 bg-white w-4 h-4 absolute -top-2 right-4 rotate-45"></div>
                <button onClick={handleLogout} className="z-2 transition duration-200 ease-in-out rounded-xl bg-red-400 hover:bg-red-500 p-4 w-36 h-2/3 flex justify-center items-center">
                    <p className="text-white semibold font-size-big-size">{
                        userLoading ?
                        <Spinner/>:
                    "Log out"}</p>
                </button>
            </div>
        </div>
    </>);
}

export default memo(HeaderUser);