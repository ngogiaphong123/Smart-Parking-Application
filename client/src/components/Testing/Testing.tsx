import { memo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {useNavigate, useLocation} from 'react-router-dom'



function Testing() {
    const [lol, setLol] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    return (<>
        {
            <motion.div
            key="dbrr"
                initial={{
                    opacity:0,
                    y:"50%"
                }}
                animate={{
                    opacity:1,
                    y:0
                }}
                exit={{
                    opacity:0,
                    y:"50%"
                }}
                transition={{
                    duration:1
                }}
                onClick={() => { setLol(prev => !prev) 
                navigate('/testing2')
                }}
                className="w-96 h-96 bg-pink-400 hover:bg-violet-300 transition duration-1000 ease-in-out">

            </motion.div>
        }
    </>);
}

export default memo(Testing);