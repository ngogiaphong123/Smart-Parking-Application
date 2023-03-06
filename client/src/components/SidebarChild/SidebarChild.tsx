import { memo } from 'react'


function SidebarChild({ icon, iconOff, content }: { icon: any, iconOff:any, content:string }) {

    return (<>
        <div className="gap-2 transition cursor-pointer duration-200 ease-in-out m-3 group min-w-0 h-10 p-4 rounded-xl flex justify-between items-center hover:bg-gradient-sidebarChild">
            <img src={iconOff} className="w-4 h-4 text-black group-hover:hidden" />
            <img src={icon} className="w-4 h-4 bg-transparent text-black group-hover:block hidden" />
            <p className="text-gray-500 group-hover:text-white font-normal text-sm ">{content}</p>
        </div>
    </>);
}

export default memo(SidebarChild);