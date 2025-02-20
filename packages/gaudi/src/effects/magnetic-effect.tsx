"use client";

import { useRef, useState } from 'react'
import { motion } from 'framer-motion';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const MagenitcEffect: React.FC<Props> = ({children, ...rest}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({x:0,y:0});

    const handleMouse = (e: any) => {
        const { clientX, clientY } = e;
        const {height, width, left, top} = ref.current?.getBoundingClientRect() as any;
        const middleX = clientX - (left + width/2)
        const middleY = clientY - (top + height/2)
        setPosition({x: middleX, y: middleY})
    }

    const reset = () => {
        setPosition({x:0, y:0})
    }

    const { x, y } = position;
    return (
        <motion.div
            style={{position: "relative"}}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{x, y}}
            transition={{type: "spring", stiffness: 150, damping: 15, mass: 0.1}}
            {...rest as any}
        >
            {children}
        </motion.div>
    )
}