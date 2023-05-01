import clsx from "clsx";
import { memo } from "react";
import { UserStore } from "../../redux/selectors";
import { useSelector } from "react-redux";
import ai_image from '../../assets/AI/ai_image.png'

function AiChattingMess({type, message}:{type:"left"|"right", message?:string}) {
    const user=useSelector(UserStore).user
    return ( <>
        <div className={clsx("w-full h-fit flex p-2 space-x-2",{
            "justify-start":type==="left",
            "justify-end":type==="right",
        })}>
            {
                type==="left"&&
            <img src={ai_image} alt="" className="w-8 h-8 rounded-full shadow-md"/>
            }
            <div className={clsx("w-fit h-fit p-2 bg-blue-100 rounded-b-xl",{
                "rounded-tr-xl":type==="left",
                "rounded-tl-xl":type==="right",
            })}>
                <div className="text-sm text-gray-700">{message}</div>
            </div>
            {
                type==="right"&&
            <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full shadow-md"/>
            }
        </div>
    </> );
}

export default memo(AiChattingMess);