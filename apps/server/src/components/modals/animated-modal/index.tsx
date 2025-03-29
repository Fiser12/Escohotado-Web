"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    modalContent: (setIsClosed: () => void) => React.ReactNode
}

export const AnimatedModal: React.FC<Props> = ({ onClose, modalContent }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const setIsClosed = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    }
    return (
        <AnimatePresence>
            {isOpen && <motion.div
                className="fixed inset-0 backdrop-blur-xs bg-opacity-30 pt-20 p-5 flex justify-center items-start z-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={setIsClosed}
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    {modalContent(setIsClosed)}
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}