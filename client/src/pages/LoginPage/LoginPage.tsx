import { memo } from 'react'
import LoginBackground from '../../components/LoginBackground/LoginBackground';
import LoginForm from '../../components/LoginForm/LoginForm';
function LoginPage() {
    return (<>
        <LoginBackground>
            <div className="w-full h-full flex justify-center items-center relative">
                <div className="absolute top-5 z-10">
                    <div className="text-xl text-center">Welcome to</div>
                    <div className="logo text-2xl sm:text-4xl inline">Parking<p className="inline font-semibold">Auto</p></div>
                </div>
                <LoginForm />
            </div>
        </LoginBackground>
    </>);
}

export default memo(LoginPage);