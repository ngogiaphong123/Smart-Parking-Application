import { memo } from 'react'
import arrowLeft from '../../assets/icon/arrow-left.svg'
import arrowLeftOff from '../../assets/icon/arrow-left-off.svg'
import arrowRight from '../../assets/icon/arrow-right.svg'
import arrowRightOff from '../../assets/icon/arrow-right-off.svg'

function ArrowsLR({handleIncreaseIndex, handleDecreaseIndex}:{handleIncreaseIndex:any
    , handleDecreaseIndex:any}) {
    return (<>
        <div className="w-10 flex justify-between items-center">
            <div onClick={handleDecreaseIndex} className="group cursor-pointer transition duration-150 ease-in-out w-4 h-4 flex justify-center items-center">
                <img src={arrowLeftOff} className="w-4 h-4 block group-hover:hidden" />
                <img src={arrowLeft} className="w-4 h-4 hidden group-hover:block" />
            </div>
            <div onClick={handleIncreaseIndex} className="group cursor-pointer transition duration-150 ease-in-out w-4 h-4 flex justify-center items-center">
                <img src={arrowRightOff} className="w-4 h-4 block group-hover:hidden" />
                <img src={arrowRight} className="w-4 h-4 hidden group-hover:block" />
            </div>

        </div>
    </>);
}

export default memo(ArrowsLR);