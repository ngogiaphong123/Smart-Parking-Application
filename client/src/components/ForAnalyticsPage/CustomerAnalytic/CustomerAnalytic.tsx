import { memo } from 'react';
import dashboard from '../../../assets/icon/dashboard.svg'
import clsx from 'clsx';

function CustomerAnalytic({ data, setChosenCustomer, chosenCustomer, setPageMode }: { setPageMode?: any, data: any, setChosenCustomer?: any, chosenCustomer?: any }) {
    return (<>
        <div onClick={() => {
            if (setChosenCustomer) {
                if(!chosenCustomer)
                setChosenCustomer(data)
                else
                if(data.accountId!==chosenCustomer.accountId)
                setChosenCustomer(data)
            }
            if (setPageMode) {
                setTimeout(() => { setPageMode("general") }, 1000)
            }
        }} className={clsx("w-full cursor-pointer bg-white hover:bg-gray transition duration-200 ease-in-out rounded-xl p-4  flex items-center drop-shadow-md", {
            "border-2 border-blue-500": chosenCustomer && chosenCustomer.accountId === data.accountId
        })}>
            <div className="flex flex-1">
                <div className="flex justify-center items-center ">
                    <img src={data.avatarUrl} alt="" className="w-10 h-10 sm:w-16 sm:h-16 p-2 rounded-full " />
                </div>
            </div>
            <div className="flex flex-col justify-center items-start flex-[2_2_0]">
                <span className="font-semibold text-super-small capitalize">{data.firstName + " " + data.lastName}</span>
                <p className="font-thin text-super-small capitalize">{data.vehicles.length} transportations</p>
            </div>
            <div className="h-full my-auto flex items-center gap-2">
                <div className="cursor-pointer hover:bg-[#2FB1CA] transition duration-100 ease-in-out flex justify-center items-center rounded-md w-6 h-6 bg-[#81D0DF]">
                    <img src={dashboard} alt="" className="w-4 h-4 " />

                </div>
            </div>
        </div>
    </>);
}

export default memo(CustomerAnalytic);