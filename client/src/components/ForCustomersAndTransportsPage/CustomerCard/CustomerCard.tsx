import { memo } from 'react'
import trashbin from '../../../assets/icon/trashbin.svg'
import cancel from '../../../assets/icon/cancel.svg'
import { useDispatch } from 'react-redux';
import CustomersSlice from '../../../redux/slices/CustomersSlice';

function CustomerCard({data}:{data:any}) {
    const dispatch = useDispatch<any>()
    return (<>
        <div onClick={()=>{
            dispatch(CustomersSlice.actions.handleChooseCustomer(data))
        }} className="w-full cursor-pointer bg-white hover:bg-gray ease-in-out rounded-xl p-4  flex items-center drop-shadow-md">
            <div className="flex flex-1">
                <div className="flex justify-center items-center ">
                    <img src={data.avatarUrl} alt="" className="w-16 h-16 p-2  rounded-full" />
                </div>
            </div>
            <div className="flex flex-col justify-center items-start flex-[2_2_0]">
                <span className="font-semibold text-super-small">{data.firstName + " " + data.lastName}</span>
                <p className="font-thin text-super-small capitalize">{data.vehicles.length} transportations</p>
            </div>
            <div className="h-full my-auto flex items-center gap-2">
                <div className="cursor-pointer hover:bg-[#CECECE] transition duration-100 ease-in-out flex justify-center items-center rounded-md w-6 h-6 bg-[#D9D9D9]">
                    <img src={cancel} alt="" className="w-4 h-4 " />

                </div>
                <div className="cursor-pointer hover:bg-[#F35B52] transition duration-100 ease-in-out flex justify-center items-center rounded-md w-6 h-6 bg-[#F7665E]">
                    <img src={trashbin} alt="" className="w-4 h-4 " />

                </div>

            </div>
        </div>
    </>);
}

export default memo(CustomerCard);