import {memo} from 'react'
import object1 from '../../assets/background/object1.png'
import object2 from '../../assets/background/object2.png'
import {motion} from 'framer-motion'
function LoginBackground({children}:{children?:any}) {
    return ( <>
        <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-0 bg-logInBackground ">
            <motion.img 
            initial={{
                x:'calc(100vw - 150px)',
                y:'-150px',
            }}
            animate={{
                x:'calc(100vw - 150px)',
                y:0
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
            }}
            src={object2} alt="" className="absolute" />
            <motion.img
            // bottom left
            initial={{
                x:-20,
                y:'calc(100vh - 350px)',
            }}
            animate={{
                x:-20,
                y:'calc(100vh - 450px)'
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
            }}
             src={object1} alt="" className="absolute" />
             {children}
        </div>
    </> );
}

export default memo(LoginBackground);