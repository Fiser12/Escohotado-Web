"use client";

import React from "react";
import { SearchModal } from "gaudi/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchedItem } from "gaudi/client";
import { searchElementsQuery } from "@/core/content/searchElementsQuery";

interface Props {
  goBackTo?: string;
 }

export const SearchModalLayout: React.FC<Props> = ({goBackTo}) => {
  const router = useRouter();
  const [items, setItems] = React.useState<SearchedItem[]>([]);
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
          items={items}
          maxItemSize={300}
          onTagClick={(tag) => console.log("Tag clicked", tag)}
          onType={async (value) => {
            const { results } = await searchElementsQuery(
              value, 
              ["article_pdf", "article_web", "book", "video"], 
              0,
              undefined, 
              20
            );
            setItems(results.map(item => ({
              id: item.id,
              href: item.href,
              icon: <p></p>,
              tags: [],
              title: item.title
            })));
          }}
          secondsDelay={2}
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
};
