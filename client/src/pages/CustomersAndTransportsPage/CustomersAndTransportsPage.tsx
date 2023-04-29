import { memo, useEffect } from "react";
import { pageMotionTime } from "../../configs";
import { motion } from 'framer-motion'
import CustomerDetail from "../../components/ForCustomersAndTransportsPage/CustomerDetail/CustomerDetail";
import CustomerCard from "../../components/ForCustomersAndTransportsPage/CustomerCard/CustomerCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import TransportCard from "../../components/ForCustomersAndTransportsPage/TransportCard/TransportCard";
import { getCustomers } from "../../redux/slices/CustomersSlice";
import { useDispatch } from "react-redux";
import { CustomersStore } from "../../redux/selectors";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import useParkingSlotsSocket from "../../utils/hooks/useParkingSlotsSocket";
import handleFindSlotNumFromVehicleId from "../../utils/handleFindSlotNumFromVehicleId";

function CustomersAndTransportsPage() {
    const dispatch = useDispatch<any>()
    const customers = useSelector(CustomersStore).customers
    const customer = useSelector(CustomersStore).customer
    const customersLoading = useSelector(CustomersStore).loading
    const parkingSlots = useParkingSlotsSocket()
    useEffect(() => {
        dispatch(getCustomers({
            "page": 0,
            "limit": 5
        }))
    }, [])
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
            className="h-full w-full p-4 mb-4 bg-white rounded-xl drop-shadow-md flex-col-reverse md:flex md:flex-row  overflow-hidden"
        >
            <div className="w-full flex flex-col items-center">
                <div className="w-full h-8 flex justify-between items-center">
                    <span className="text-md text-title-inPage font-semibold capitalize">
                        List of your customers
                    </span>
                </div>
                <div className="w-full h-fit p-2">
                    <SearchBar />
                </div>
                <div className="w-full overflow-y-auto h-fit max-h-[600px] space-y-2 p-2 flex flex-col">
                    {
                        customersLoading ? <div className="w-full h-full flex justify-center items-center">
                            <Spinner />
                        </div> :
                            <>
                                {
                                    customers && customers.map((customer: any, index: number) => {
                                        return <CustomerCard data={customer} key={index} />
                                    })
                                }
                            </>
                    }
                </div>
            </div>
            <div className="w-full flex flex-col lg:border-l-2 pl-4 lg:border-[#81D0DF] pt-4 lg:pt-0">
                <div className="w-full h-8 flex justify-between items-center">
                    <span className="text-md text-title-inPage font-semibold capitalize">
                        Customer's Details
                    </span>
                </div>
                {
                    customer ?
                        <>
                            <div className="w-full h-fit p-2 border-b">
                                <CustomerDetail type="nothing" data={customer} />
                            </div>
                            <div className="w-full h-fit p-2 max-h-[600px] overflow-y-auto space-y-2">
                                {
                                    customer.vehicles ? customer.vehicles.map((vehicle: any, index: number) => {
                                        return <TransportCard slot={handleFindSlotNumFromVehicleId(vehicle.vehicleId, parkingSlots)} data={vehicle} key={index} />
                                    })
                                    :
                                    <div className="w-full h-full flex justify-center items-center">
                                        <span className="text-md text-title-inPage font-semibold capitalize">
                                            No vehicles
                                        </span>
                                    </div>
                                }
                            </div>
                        </>
                        :
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="text-md text-title-inPage font-semibold capitalize">
                                Choose a customer to see details
                            </span>
                        </div>
                }
            </div>
        </motion.div>
    </>);
}

export default memo(CustomersAndTransportsPage);