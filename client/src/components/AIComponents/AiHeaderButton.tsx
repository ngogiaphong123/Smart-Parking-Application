import { memo } from "react";
import ai_image from '../../assets/HeaderLogo/ai_image.png'
import clsx from "clsx";
import { AiStore } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AiSlice from "../../redux/slices/modals/AiSlice";

function AiHeaderButton() {
    const AiIsOn = useSelector(AiStore).show
    const dispatch = useDispatch<any>()
    return ( <>
        <div onClick={()=>{
            if(AiIsOn) dispatch(AiSlice.actions.handleClose({}))
            else
            dispatch(AiSlice.actions.handleOpen({}))
        }} className={clsx("cursor-pointer  w-fit h-fit rounded-xl border-2 flex justify-between items-center p-1 sm:p-2 space-x-2 sm:space-x-4",
            {
                "border-sky-300 shadow-sm sm:shadow-md": AiIsOn,
            }
        )}>
            <img src={ai_image} alt="" className="w-6 sm:w-8 h-6 sm:h-8" /> 
            <span className={clsx("text-sm font-semibold text-gray-300", {
                "text-sky-500": AiIsOn,
            })}> Mode</span>
        </div>
    </> );
}

export default memo(AiHeaderButton);