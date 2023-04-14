import { memo } from "react";
import { pageMotionTime } from "../../configs";
import { motion } from 'framer-motion'
import CustomerDetail from "../../components/CustomerDetail/CustomerDetail";

function CustomersAndTransports() {
    return (<>
        <motion.div
            initial={{
                opacity: 0,
                y: "10%"
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: "10%"
            }}
            transition={{
                duration: pageMotionTime
            }}
            className="h-full w-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex overflow-hidden"
        >
            <div className="w-full flex flex-col items-center">
                <div className="w-full h-8 flex justify-between items-center">
                    <span className="text-md text-title-inPage font-semibold capitalize">
                        List of your customers
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-col border-l-2 pl-4 border-[#81D0DF]">
                <div className="w-full h-8 flex justify-between items-center">
                    <span className="text-md text-title-inPage font-semibold capitalize">
                        Customer's Details
                    </span>
                </div>
                <div>
                    <CustomerDetail type="not adjust"/>
                </div>
            </div>
        </motion.div>
    </>);
}

export default memo(CustomersAndTransports);