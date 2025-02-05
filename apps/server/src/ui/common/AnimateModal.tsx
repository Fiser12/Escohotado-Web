"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onClose: () => void;

}

export const AnimatedModal: React.FC<Props> = ({ onClose, children }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <AnimatePresence>
            {isOpen && <motion.div
                className="fixed inset-0 backdrop-blur-xs bg-opacity-30 pt-20 p-5 flex justify-center items-start z-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                    setIsOpen(false);
                    setTimeout(onClose, 300);
                }}
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}