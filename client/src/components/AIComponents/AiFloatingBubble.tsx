import { memo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pageMotionTime } from '../../configs';
import Draggable from 'react-draggable';
import ai_bubble_image from "../../assets/AI/ai_bubble_image.png"
import { AiStore } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import AiFloatingChatRoom from './AiFloatingChatRoom';
import { useDispatch } from 'react-redux';
import AiSlice from '../../redux/slices/modals/AiSlice';

function AiFloatingBubble() {
    const [state, setState] = useState({ activeDrags: 0 } as any);
    const [positionSide, setPositionSide] = useState<"left" | "right">("right")
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const onStart = (e: any, ui: any) => {
        setState({ activeDrags: ++state.activeDrags });
    };

    const onStop = (event: any) => {
        setState({ activeDrags: --state.activeDrags });
        if (event.type === 'mousemove' || event.type === 'touchmove') {
            setDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend') {
            setTimeout(() => {
                setDragging(false);
            }, 100);

        }
    };

    const onDrag = (event: any, ui: any) => {
        const { x, y } = ui;
        setPosition({ x, y });
        if (event.type === 'mousemove' || event.type === 'touchmove') {
            setDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend') {
            setTimeout(() => {
                setDragging(false);
            }, 100);

        }
    }
    // const exitMotion = 
    // useCallback(
    // () => {
    //     if (Math.abs(position.x - 60) >= window.innerWidth / 2)
    //     {
    //         setPositionSide("left")
    //         return -(window.innerWidth / 2 - (window.innerWidth / 2 - Math.abs(position.x - 60))).toString() + "px"
    //     }
    //     else
    //     {
    //         setPositionSide("right")
    //         return (window.innerWidth / 2 - (window.innerWidth / 2 - Math.abs(position.x - 60))).toString() + "px"
    //     }
    // }
    // , [window.innerWidth,position.x])
    useEffect(() => {
        if (Math.abs(position.x - 60) >= window.innerWidth / 2) {
            setPositionSide("left")
            // return -(window.innerWidth / 2 - (window.innerWidth / 2 - Math.abs(position.x - 60))).toString() + "px"
        }
        else {
            setPositionSide("right")
            // return (window.innerWidth / 2 - (window.innerWidth / 2 - Math.abs(position.x - 60))).toString() + "px"
        }
    }, [window.innerWidth, position.x])
    const dragHandlers = { onStart: onStart, onStop: onStop, onDrag: onDrag };
    const dispatch = useDispatch<any>()
    const chatRoomIsShow = useSelector(AiStore).chatRoomShow
    return (<>
        <motion.div
            initial={{
                opacity: 0,
                x: "50px"
            }}
            animate={{
                opacity: 1,
                x: "-10px"
            }}
            exit={{
                opacity: 0,
                x: positionSide === "left" ? "-50vw" : "50vw",
            }}
            transition={{
                duration: pageMotionTime
            }}
            className="fixed top-[70px] right-[20px] z-20">
            <Draggable handle="strong" {...dragHandlers}>
                <div className={("w-fit h-fit flex space-x-2 sm:space-x-4 flex-row relative"
                )}>
                    <strong onClick={() => {
                        if (dragging)
                            return
                        if (!chatRoomIsShow) {
                            dispatch(AiSlice.actions.handleChatRoomOpen({}))
                        }
                        else
                            dispatch(AiSlice.actions.handleChatRoomClose({}))
                    }} className="box cursor-grabbing hover:bg-blue-100 hover:border-2 hover:border-blue-300 duration-100 font-semibold rounded-full w-11 h-11 sm:w-14 sm:h-14 bg-white shadow-sm sm:shadow-md flex justify-center items-center">
                        <img src={ai_bubble_image} draggable="false" className="box w-6 h-6 sm:w-8 sm:h-8" />
                    </strong>
                    <AnimatePresence mode="wait">
                        {
                            chatRoomIsShow &&
                            <AiFloatingChatRoom positionSide={positionSide} key="trivandeptrai" />
                        }
                    </AnimatePresence>
                </div>
            </Draggable>
        </motion.div>
    </>);
}

export default memo(AiFloatingBubble);