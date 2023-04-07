import {memo} from 'react'
import { motion } from 'framer-motion'

function PaymentHistory() {
    return ( <>
        <motion.div
            initial={{
                opacity: 0,
            }}
    </> );
}

export default memo(PaymentHistory);