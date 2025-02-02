"use client";

import React from "react";
import { SearchModal } from "gaudi/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  goBackTo?: string;
 }

export const SearchModalLayout: React.FC<Props> = ({goBackTo}) => {
  const router = useRouter();

  return <AnimatePresence>
    <motion.div
      className="fixed inset-0 backdrop-blur-xs bg-opacity-30 pt-20 p-5 flex justify-center items-start z-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        if(goBackTo) router.push(goBackTo);
        else router.back();
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <SearchModal
          items={[]}
          maxItemSize={300}
          onTagClick={(tag) => console.log("Tag clicked", tag)}
          onType={(value) => console.log("Typing", value)}
          secondsDelay={1}
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
};
