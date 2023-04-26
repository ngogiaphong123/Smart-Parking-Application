import { memo } from 'react'
import object1 from '../../assets/background/object1.png'
import object2 from '../../assets/background/object2.png'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet } from 'react-router-dom';
function LoginBackground() {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-0 bg-logInBackground ">
            <AnimatePresence mode="wait">
            <motion.img
                key="img1"
                initial={{
                    x: 'calc(100vw - 150px)',
                    y: '-150px',
                }}
                animate={{
                    x: 'calc(100vw - 150px)',
                    y: 0
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
                exit={{
                    x: 'calc(100vw - 150px)',
                    y: '-150px',
                }}
                src={object2} alt="" className="absolute" />
            <motion.img
                key="img2"
                // bottom left
                initial={{
                    x: -20,
                    y: 'calc(100vh - 350px)',
                }}
                animate={{
                    x: -20,
                    y: 'calc(100vh - 450px)'
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
                exit={{
                    x: -20,
                    y: 'calc(100vh - 350px)',
                }}
                src={object1} alt="" className="absolute" />
            </AnimatePresence>
            <div className="w-full h-full flex justify-center items-center relative">
                <div className="absolute top-5 z-10">
                    <div className="text-xl text-center">Welcome to</div>
                    <div className="logo text-2xl sm:text-4xl inline">Parking<p className="inline font-semibold">Auto</p></div>
                </div>
                    <Outlet/>
            </div>
        </div>
    );
}

export default memo(LoginBackground);