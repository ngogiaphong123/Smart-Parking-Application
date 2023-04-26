import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { UserStore } from "../redux/selectors";
import Spinner from "../components/Spinner/Spinner";

function AdminOnly() {
    const user = useSelector(UserStore).user
    const navigate = useNavigate()
    useEffect(()=>{
        if(user)
            {
                if(user.role !== "admin")
                {
                    navigate("/notification", {
                        state: {
                            type: "error",
                            message: "You are not allowed to access this page",
                            link: "/customer"
                        }
                    })
                }
                return
            }
        else {
            navigate("/notification", {
                state: {
                    type: "error",
                    message: "You are not allowed to access this page",
                    link: "/error"
                }
            })
        }
    },[])
    return (<>
        {
            (user && user.role === "admin") ?
                <Outlet />
                :
                <div className="w-full h-[600px] flex justify-center items-center">
                    <Spinner />
                </div>
        }
    </>);
}

export default memo(AdminOnly);