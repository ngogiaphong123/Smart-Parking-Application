import clsx from 'clsx'
import { memo } from 'react'
import HeaderUser from '../HeaderUser/HeaderUser';
import Sidebar from '../SidebarAdmin/SidebarAdmin';
import { MenuStore } from '../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import MenuSlice from '../../../redux/slices/MenuSlice';
const MenuBar = () => {
    const menuIsShow = useSelector(MenuStore).data
    const dispatch = useDispatch<any>()
    return (
        <>
            <div onClick={() => { dispatch(MenuSlice.actions.handleClose({})) }} className={clsx("transition md:hidden duration-300 fixed top-0 left-0 right-0 bottom-0 bg-slate-400 z-10 opacity-50", {
                "hidden": (!menuIsShow),
                "block": menuIsShow,
            })}></div>
            <div
            className={clsx("fixed md:hidden translate-x-0 transition w-full overflow-y-auto sm:ring-1 sm:ring-gray-900/10 mobile:max-w-[400px] transform ease-in-out duration-300  right-0 bg-white h-screen z-20 drop-shadow flex flex-col justify-between",{
                "translate-x-full" : !menuIsShow 
            })}
                >
                <div className="flex flex-col">
                    <div className="w-full p-4 h-12 flex justify-between items-center border-b-1 border-gray">
                        <div className="text-semibold text-gray font-big-size">
                            Menu bar
                        </div>
                        <button onClick={() => { dispatch(MenuSlice.actions.handleClose({})) }} className="transition duration-200 ease-in-out flex justify-center items-center p-2 bg-gray rounded-xl hover:bg-gray-hover">
                            <p className="semibold text-gray">Close</p>
                        </button>
                    </div>
                    <div className="w-full h-16 flex justify-center items-center border-b-1 border-gray">
                        <HeaderUser/>
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
            </div>
        </>
    )
};


export default memo((MenuBar));