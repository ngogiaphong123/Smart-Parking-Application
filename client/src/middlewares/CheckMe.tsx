import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../redux/selectors";
import { getMe } from "../redux/slices/UserSlice";
import { Outlet } from 'react-router-dom'
import Spinner from "../components/Spinner/Spinner";

function CheckMe() {
    const dispatch = useDispatch<any>();
    const user = useSelector(UserStore)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("accessToken"))
            dispatch(getMe())
                .then((res: any) => {
                    if (res.payload.status === "Success") {
                    }
                    else {
                        localStorage.removeItem("accesssToken")
                        navigate('/')
                    }
                })
    }, [])
    return (<>
        {
            localStorage.getItem("accessToken") ?
                <>
                    {
                        user.user ?
                            <Outlet />
                            :
                            <div className="w-full h-full flex justify-center items-center">
                                <Spinner />
                            </div>
                    }
                </>
                :
                <>
                    <Outlet />
                </>
        }
    </>);
}

export default memo(CheckMe);