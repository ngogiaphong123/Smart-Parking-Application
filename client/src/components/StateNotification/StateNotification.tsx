import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons'


function StateNotification() {
    return (<>
        <div className="w-64 h-36 p-4 min-h-16 bg-white flex flex-col items-center drop-shadow-md rounded-xl">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-500 flex justify-center items-center rounded-full">
                    <FontAwesomeIcon icon={faCheck as IconProp} className='w-6 h-6 text-white' />
                </div>
                <div className="text-blue-500 text-super-small font-semibold">Success!</div>
            </div>
            <p className="text-super-small p-4 font-regular text-blue-500">This is a state notification</p>
        </div>

    </>);
}

export default memo(StateNotification);