import { memo, useState, useRef } from "react";
import { pageMotionTime } from "../../configs";
import { motion } from 'framer-motion'
import CustomerDetail from "../../components/ForCustomersAndTransportsPage/CustomerDetail/CustomerDetail";
import TransportDetail from "../../components/TransportDetail/TransportDetail";
import TransportCard from "../../components/ForCustomersAndTransportsPage/TransportCard/TransportCard";
import { ParkingSlotsStore, UserStore } from "../../redux/selectors";
import { useSelector } from "react-redux";
import handleFindSlotNumFromVehicleId from "../../utils/handleFindSlotNumFromVehicleId";

function UserProfilePage() {
    const viewScrollRef = useRef<any>(null)
    const user = useSelector(UserStore).user
    const parkingSlots = useSelector(ParkingSlotsStore).parkingSlots
    const [transport, setTransport] = useState<any>(null)
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
            <CustomerDetail type="adjust" data={user} />
            <div className="w-full border-t h-full flex flex-col md:flex-row">
                <div className="flex-1 w-full h-fit flex flex-col p-4 space-y-2 border-r">
                    {
                        user.vehicles ? user.vehicles.map((vehicle: any, index: number) => {
                            return <TransportCard setTransport={setTransport} scrollToView={()=>{
                                viewScrollRef.current?.scrollIntoView({behavior: "smooth"})
                            }} slot={handleFindSlotNumFromVehicleId(vehicle.vehicleId, parkingSlots)} data={vehicle} key={index} transport={transport}/>
                        })
                            : <div className="w-full h-full flex justify-center items-center">
                                <span className="text-md text-title-inPage font-semibold capitalize">
                                    No vehicle
                                </span>
                            </div>
                    }
                </div>
                <div className="flex-1 w-full h-full flex flex-col  p-4">
                    <div className="w-full h-8 flex justify-between items-center " >
                        <span className="text-md text-title-inPage font-semibold capitalize">
                            Transport information
                        </span>
                    </div>
                    {
                        transport ?
                        <TransportDetail viewScrollRef={viewScrollRef} type="adjust" data={transport}/>
                        : <div className="w-full h-full flex justify-center items-center">
                            <span className="text-md text-title-inPage font-semibold capitalize">
                                Choose a transport to see detail
                            </span>
                        </div>
                    }
                </div>
            </div>
        </motion.div>
    </>);
}

export default memo(UserProfilePage);