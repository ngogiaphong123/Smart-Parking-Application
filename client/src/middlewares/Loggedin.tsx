import {memo, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { UserStore } from '../redux/selectors';
import {Outlet, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner';
function Loggedin() {
    const user = useSelector(UserStore) 
    const navigate = useNavigate()
    useEffect(()=>{
        if(user.user)
        {
            navigate("/notification", {
                state: {
                    type: "error",
                    message: "You are already logged in",
                    link: user.user.role==="admin"?"/admin":"/customer"
                }
            })
        }
    },[])
    return ( <>
        {
            !user.user ?
            <Outlet />
            :
            <div className="w-full h-[600px] flex justify-center items-center">
                <Spinner />
            </div>
        }
    </> );
}

export default memo(Loggedin);