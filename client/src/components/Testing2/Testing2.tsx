import { memo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {useNavigate, useLocation} from 'react-router-dom'

function Testing2() {
    const [lol, setLol] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    return (<>
        {
            <motion.div
            key="cc"
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
                navigate('/testing')}}
                className="w-96 h-96 ml-auto bg-pink-400">

            </motion.div>
        }
    </>);
}

export default memo(Testing2);