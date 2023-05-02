import clsx from "clsx";
import { memo, useState, useEffect } from "react";
import { AiStore, UserStore } from "../../redux/selectors";
import { useSelector } from "react-redux";
import ai_image from '../../assets/AI/ai_image.png'
import Spinner from "../Spinner/Spinner";

function AiChattingMess({ type, message }: { type: "left" | "right", message?: string }) {
    const [displayText, setDisplayText] = useState("")
    const user = useSelector(UserStore).user
    const AiLoading = useSelector(AiStore).AiLoading
    useEffect(() => {
        if (type === "left") {
            if(message==="loading")
            {

            }
            else {
                if(displayText!==message)
                setTimeout(()=>{
                    setDisplayText(prev=>prev+message![prev.length])
                },50)
            }
        }
    }, [message, displayText])
    return (<>
        <div className={clsx("w-full h-fit flex p-2 space-x-2", {
            "justify-start": type === "left",
            "justify-end": type === "right",
        })}>
            {
                type === "left" &&
                <img src={ai_image} alt="" className="w-8 h-8 rounded-full shadow-md" />
            }
            <div className={clsx("w-fit h-fit p-2 bg-white shadow-md rounded-b-xl", {
                "rounded-tr-xl": type === "left",
                "rounded-tl-xl": type === "right",
            })}>
                {
                    AiLoading && type === "left" && message === "loading" ?
                        <Spinner />
                        :
                        <div className="text-sm text-gray-700">{type === "right" ? message : displayText}</div>
                }
            </div>
            {
                type === "right" &&
                <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full shadow-md" />
            }
        </div>
    </>);
}

export default memo(AiChattingMess);