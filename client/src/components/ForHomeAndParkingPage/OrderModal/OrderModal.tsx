import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderModalStore } from "../../../redux/selectors";
import OrderModalSlice from "../../../redux/slices/modals/OrderModalSlice";
import { AnimatePresence, motion } from "framer-motion";
import { pageMotionTime } from "../../../configs";
import OrderDetail from "../../OrderDetail/OrderDetail";

function OrderModal() {
    const orderModalIsShow = useSelector(OrderModalStore).show
    const dispatch = useDispatch<any>()
    return (<>
        <AnimatePresence mode="wait">
            {
                orderModalIsShow &&
                <div className="w-full h-full fixed flex justify-center items-center  z-30">
                    <div onClick={() => {
                        dispatch(OrderModalSlice.actions.handleClose({}))
                    }} className="w-full h-full fixed bg-zinc-400 opacity-50">
                    </div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: "10%"
                        }}
                        animate={{
                            opacity: orderModalIsShow ? 1 : 0,
                            y: orderModalIsShow ? 0 : "10%"
                        }}
                        exit={{
                            opacity: 0,
                            y: "10%"
                        }}
                        transition={{
                            duration: pageMotionTime
                        }}
                        className="w-[100%] max-w-[360px] sm:max-w-[600px] h-fit fixed -mt-16  shadow-md "
                    >
                        <OrderDetail/>
                    </motion.div>
                </div>
            }
        </AnimatePresence>
    </>);
}

export default memo(OrderModal);