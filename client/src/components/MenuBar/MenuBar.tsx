import clsx from 'clsx'
import { memo, useState, useEffect, forwardRef, useImperativeHandle, useCallback, useRef } from 'react'
import HeaderUser from '../HeaderUser/HeaderUser';
import Sidebar from '../SidebarAdmin/SidebarAdmin';
import {motion} from 'framer-motion'
const MenuBar = forwardRef(({role}:{role:string}, ref) => {
    const menuRef = useRef<any>(null);
    // for checking responsive
    const [checkLgScreen, setCheckLgScreen] = useState(() => {
        if (window.innerWidth >= 1024) return true;
        return false;
    })
    useEffect(() => {
        function handleCheckLgScreen() {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false)
                setCheckLgScreen(true);
            }
            else
                setCheckLgScreen(false);
        }
        window.addEventListener('resize', handleCheckLgScreen);
        return () => {
            window.removeEventListener('resize', handleCheckLgScreen);
        }
    }, [])
    // for MenuBar
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuOnClick = useCallback(()=>{
        setIsMenuOpen(!isMenuOpen);
    },[])
    useImperativeHandle(ref, () => ({
        handleMenuOnClick,
        isMenuOpen,
    }));
    return (
        <>
            <div onClick={() => { setIsMenuOpen(false) }} className={clsx("transition duration-300 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 z-10 opacity-50", {
                "hidden": (!isMenuOpen) || checkLgScreen,
                "block": isMenuOpen,
            })}></div>
            {/* <div className={clsx("fixed transition w-full overflow-y-auto sm:ring-1 sm:ring-gray-900/10 mobile:max-w-[400px] transform ease-in-out duration-300  right-0 bg-white h-screen z-10 drop-shadow flex flex-col justify-between", {
                "translate-x-0": isMenuOpen,
                "translate-x-full ": (!isMenuOpen) || checkLgScreen,
            })}>
                <div className="flex flex-col">
                    <div className="w-full p-4 h-12 flex justify-between items-center border-b-1 border-gray">
                        <div className="text-semibold text-gray font-big-size">
                            Menu bar
                        </div>
                        <button onClick={() => { setIsMenuOpen(false) }} className="transition duration-200 ease-in-out flex justify-center items-center p-2 bg-gray rounded-xl hover:bg-gray-hover">
                            <p className="semibold text-gray">Close</p>
                        </button>
                    </div>
                    <div className="w-full h-16 flex justify-center items-center border-b-1 border-gray">
                        <HeaderUser isMenuOpen={isMenuOpen} />
                    </div>
                    <div className="w-full flex justify-center">
                    <Sidebar/>
                    </div>
                </div>
                <div className="w-full flex h-50 justify-center">
                    <button className="z-2 transition duration-200 ease-in-out rounded-xl bg-red-400 hover:bg-red-500 p-4 w-36 h-2/3 flex justify-center items-center">
                        <p className="text-white semibold font-size-big-size">Log out</p>
                    </button>
                </div>
            </div> */}
            <motion.div
            ref={menuRef}
            initial={{
                x:"100%"
            }}
            animate={isMenuOpen?{
                x:`calc(100% - ${menuRef.current.offsetWidth}px)`
                
            }:{}}
            className="fixed transition w-full overflow-y-auto sm:ring-1 sm:ring-gray-900/10 mobile:max-w-[400px] transform ease-in-out duration-300  right-0 bg-white h-screen z-20 drop-shadow flex flex-col justify-between"
                >
                <div className="flex flex-col">
                    <div className="w-full p-4 h-12 flex justify-between items-center border-b-1 border-gray">
                        <div className="text-semibold text-gray font-big-size">
                            Menu bar
                        </div>
                        <button onClick={() => { setIsMenuOpen(false) }} className="transition duration-200 ease-in-out flex justify-center items-center p-2 bg-gray rounded-xl hover:bg-gray-hover">
                            <p className="semibold text-gray">Close</p>
                        </button>
                    </div>
                    <div className="w-full h-16 flex justify-center items-center border-b-1 border-gray">
                        <HeaderUser role={role} isMenuOpen={isMenuOpen} />
                    </div>
                    <div className="w-full flex justify-center">
                    <Sidebar/>
                    </div>
                </div>
                <div className="w-full flex h-50 justify-center">
                    <button className="z-20 transition duration-200 ease-in-out rounded-xl bg-red-400 hover:bg-red-500 p-4 w-36 h-2/3 flex justify-center items-center">
                        <p className="text-white semibold font-size-big-size">Log out</p>
                    </button>
                </div>
            </motion.div>
        </>
    )
});


export default memo((MenuBar));