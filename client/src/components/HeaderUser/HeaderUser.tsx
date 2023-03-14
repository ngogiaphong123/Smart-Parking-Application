import { memo, useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import andy from './phong.jpg'
import clsx from 'clsx';

function HeaderUser({ role, isMenuOpen }: { role:string, isMenuOpen: boolean }) {
    const navigate = useNavigate()
    const [isAvatarClickedOutside, setIsAvatarClickedOutside] = useState(true)
    const myRef = useRef<any>(null);
    const handleAvatarClickOutside = (e:any) => {
        if (!myRef.current.contains(e.target)) {
            setIsAvatarClickedOutside(true);
        }
    };
    const handleAvatarClickInside = () => setIsAvatarClickedOutside(false);
    useEffect(() => {
        document.addEventListener('mousedown', handleAvatarClickOutside);
        return () => document.removeEventListener('mousedown', handleAvatarClickOutside);
    });
    return (<>
        <div className="w-60 items-center justify-between flex ">
            <div className="w-10 h-10 bg-neutral-200 rounded-xl flex justify-center items-center drop-shadow">
                <FontAwesomeIcon icon={faBell as IconProp} className='w-6 h-6 text-gray-500' />
            </div>
            <div onClick={()=>{
                if(!isMenuOpen)
                handleAvatarClickInside()
                }} className="relative hover:bg-gray-hover  cursor-pointer flex w-44 rounded-xl items-center justify-center border-solid border-1 border-gray-200 overflow-hidden">
                <img src={andy} className="w-10 h-10" />
                <div className="flex w-full items-center justify-center px-4">
                    <div className="flex flex-col items-center">
                        <p className="semibold text-gray-600" style={{ fontSize: 12 }}>{role==="admin"?"Administrator":"User"}</p>
                        <p style={{ fontSize: 12, color: "#bdbdbd" }}>ID: 12356</p>
                    </div>
                    {
                        !isMenuOpen &&
                        <div ref={myRef}  className={"pl-4"}>
                            <FontAwesomeIcon icon={faChevronDown as IconProp} className={clsx("text-gray-500 ", {
                                "text-sky-300": !isAvatarClickedOutside
                            })} />
                        </div>
                    }
                </div>
            </div>
            <div className={clsx("transition duration-200 ease-in-out absolute bg-white top-full right-8 w-44 h-16 rounded-xl drop-shadow p-8 flex justify-center items-center",{
                "opacity-0": isAvatarClickedOutside
            })}>
                <div className="z-0 bg-white w-4 h-4 absolute -top-2 right-4 rotate-45"></div>
                <button onClick={()=>{navigate("/login")}} className="z-2 transition duration-200 ease-in-out rounded-xl bg-red-400 hover:bg-red-500 p-4 w-36 h-2/3 flex justify-center items-center">
                    <p className="text-white semibold font-size-big-size">Log out</p>
                </button>
            </div>
        </div>
    </>);
}

export default memo(HeaderUser);