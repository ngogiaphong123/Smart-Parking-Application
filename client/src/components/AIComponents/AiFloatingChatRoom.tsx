import { memo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { AiStore } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import AiSlice, { AiAnswerHandle } from "../../redux/slices/modals/AiSlice";
import AiChattingMess from "./AiChattingMess";

const AiFloatingChatRoom = ({ positionSide }: { positionSide: string }) => {
    const { currMess, chats } = useSelector(AiStore)
    const dispatch = useDispatch<any>()
    const chatRoomRef = useRef<any>(null)
    useEffect(() => {
        // scroll to bottom
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight
    }, [chats.length])
    return (<>
        <motion.form
            initial={{
                opacity: 0,
                x: positionSide === "left" ? "-10%" : "10%",
                scale: 0,
                transformOrigin: positionSide === "left" ? "bottom left" : "bottom right"
            }}
            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transformOrigin: positionSide === "left" ? "bottom left" : "bottom right"
            }}
            exit={{
                opacity: 0,
                x: positionSide === "left" ? "-10%" : "10%",
                scale: 0,
                transformOrigin: positionSide === "left" ? "bottom left" : "bottom right"
            }}
            onSubmit={(e: any) => {
                e.preventDefault();
                if (currMess === "") return
                dispatch(AiSlice.actions.handleSendMess({
                    type: "left"
                }))
                dispatch(AiAnswerHandle(currMess))
                    .then((res: any) => {
                        console.log(res)
                    })
            }} className={clsx("shadow-lg absolute bg-gradient-chatroom w-64 sm:w-96 h-96 max-w-96 max-h-96 flex flex-col items-center justify-between", {
                "bottom-0 left-[50px]": positionSide === "left",
                "bottom-0 right-[70px]": positionSide === "right"
            })}>
            <div className={clsx("w-full h-fit max-h-96 opacity-50 fixed bottom-0 left-0 z-0 rounded-tr-xl rounded-tl-xl")}>
            </div>
            <div ref={chatRoomRef} className="w-full bg-transparent h-80 overflow-y-auto flex flex-col ">
                {chats && chats.map((chat: any, index: number) => {
                    return <AiChattingMess key={index} message={chat.message} type={chat.type} />
                })}
            </div>
            <div className={clsx("w-full h-fit bg-white z-10 overflow-hidden")}>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg bg-transparent">
                    <input onChange={(e) => {
                        dispatch(AiSlice.actions.handleCurrMess(e.target.value))
                    }} value={currMess} id="chat" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></input>
                    <button onClick={() => {
                        if (currMess === "") return
                        dispatch(AiSlice.actions.handleSendMess({
                            type: "right"
                        }))
                        dispatch(AiAnswerHandle(currMess))
                            .then((res: any) => {
                                console.log(res)
                            })
                    }} type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </div>
        </motion.form>

    </>);
}

export default memo(AiFloatingChatRoom);