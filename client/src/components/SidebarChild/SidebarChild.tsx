import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons'


function SidebarChild() {
    
    return (<>
        <div className="transition cursor-pointer duration-200 ease-in-out m-3 group w-36 h-10 p-4 rounded-xl flex justify-between items-center hover:bg-gradient-sidebarChild">
            <FontAwesomeIcon icon={faCheck as IconProp} className='w-4 h-4 text-sidebarChild group-hover:text-white' />
            <p className="text-gray-500 group-hover:text-white font-normal text-sm ">SidebarChild</p>
        </div>
    </>);
}

export default memo(SidebarChild);