"use client";

import React, { useEffect, useRef, useState } from "react";
import { SearchModal, SearchOptions } from "gaudi/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchedItem } from "gaudi/client";
import { searchElementsQuery } from "@/core/content/searchElementsQuery";
import { getIconByCollection } from "@/ui/getIconByCollection";
import { mapSearchOptionsToCollections } from "@/core/domain/mapping/mapSearchOptionsToCollections";

interface Props {
  goBackTo?: string;
}

export const SearchModalLayout: React.FC<Props> = ({ goBackTo }) => {
  const router = useRouter();

  const [items, setItems] = useState<SearchedItem[]>([]);
  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<SearchOptions>("all");

  const LIMIT = 20;

  const fetchResults = async (
    query: string,
    filterValue: SearchOptions,
    pageNumber: number
) => {
    try {
      const collections = mapSearchOptionsToCollections(filterValue);
      setLoading(true);
      const { results } = await searchElementsQuery(
        query,
        collections,
        pageNumber,
        undefined,
        LIMIT
      );
      const newItems = results.map((item) => ({
        id: item.id,
        href: item.href,
        icon: getIconByCollection(item.collection),
        tags: [],
        title: item.title,
      }));

      if (pageNumber === 0) {
        setItems(newItems);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }

      if (newItems.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length < 3) {
      setItems([]);
      return;
    }
    fetchResults(searchQuery, filter, page);
  }, [searchQuery, page, filter]);


  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [loading, hasMore]);

  const handleOnType = (value: string) => {
    if (value.length < 3) {
      setSearchQuery("");
      setItems([]);
      setPage(0);
      setHasMore(true);
      return;
    }
    setSearchQuery(value);
    setPage(0);
    setHasMore(true);
  };

  const handleFilterChange = (newFilter: SearchOptions) => {
    setFilter(newFilter);
    setPage(0);
    if (searchQuery.length >= 3) {
      fetchResults(searchQuery, newFilter, 0);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 backdrop-blur-xs bg-opacity-30 pt-20 p-5 flex justify-center items-start z-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          if (goBackTo) router.push(goBackTo);
          else router.back();
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
          <SearchModal
            items={items}
            maxItemSize={400}
            onTagClick={(tag) => console.log("Tag clicked", tag)}
            onType={handleOnType}
            onFilterChange={handleFilterChange}
            secondsDelay={2}
          >
            { hasMore && <div ref={loadMoreRef} style={{ height: "1px", background: "transparent" }}></div> }
            { loading && <p>Loading more results...</p> }
          </SearchModal>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
