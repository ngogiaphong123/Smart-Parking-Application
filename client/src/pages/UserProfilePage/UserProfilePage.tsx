import { memo } from "react";
import { pageMotionTime } from "../../configs";
import { motion } from 'framer-motion'
import CustomerDetail from "../../components/ForCustomersAndTransportsPage/CustomerDetail/CustomerDetail";
import TransportDetail from "../../components/TransportDetail/TransportDetail";
import TransportCard from "../../components/ForCustomersAndTransportsPage/TransportCard/TransportCard";

function UserProfilePage() {
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

            className="w-full h-full p-4 bg-white rounded-xl drop-shadow-md flex flex-col overflow-hidden mb-4" >
            <div className="w-full h-8 flex justify-between items-center " >
                <span className="text-md text-title-inPage font-semibold capitalize">
                    User information
                </span>
            </div>
            <CustomerDetail type="adjust" />
            <div className="w-full border-t h-full flex ">
                <div className="flex-1 w-full h-fit flex flex-col p-4 space-y-2 border-r">
                    <TransportCard slot="1" />
                    <TransportCard slot="1" />
                    <TransportCard slot="1" />
                    <TransportCard slot="1" />
                    <TransportCard slot="1" />
                </div>
                <div className="flex-1 w-full h-full flex flex-col  p-4">
                    <div className="w-full h-8 flex justify-between items-center " >
                        <span className="text-md text-title-inPage font-semibold capitalize">
                            Transport information
                        </span>
                    </div>
                    <TransportDetail type="adjust" />
                </div>
            </div>
        </motion.div>
    </>);
}

export default memo(UserProfilePage);