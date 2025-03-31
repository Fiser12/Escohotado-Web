"use client";

import { searchElementsQuery } from "@/core/queries/searchElementsQuery";
import { mapSearchOptionsToCollections } from "@/core/mappers/mapSearchOptionsToCollections";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { SearchOptions } from ".";
import { routes } from "@/core/routesGenerator";
import { SearchedItem } from ".";
import { SearchModal } from ".";
import { AnimatedModal } from "@/components/modals/animated-modal";
import { getIconByCollection } from "@/components/assets/icons";

export const SearchModalLayout: React.FC<{ goBackTo?: string; }> = ({ goBackTo }) => {
    const [items, setItems] = useState<SearchedItem[]>([]);
    const [page, setPage] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [filter, setFilter] = useState<SearchOptions>("all");
    const router = useRouter();

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

    const onCloseModal = () => {
        if (goBackTo) router.push(goBackTo);
        else router.back();
    };

    return (
        <AnimatedModal
            onClose={onCloseModal}
            modalContent={() => (
                <SearchModal
                    items={items}
                    subscriptionHref={routes.nextJS.subscriptionPageHref}
                    maxItemSize={400}
                    onTagClick={(tag) => console.log("Tag clicked", tag)}
                    onType={handleOnType}
                    onFilterChange={handleFilterChange}
                    secondsDelay={2}
                >
                    {hasMore && <div ref={loadMoreRef} style={{ height: "1px", background: "transparent" }}></div>}
                    {loading && <p>Loading more results...</p>}
                </SearchModal>
            )}
        />
    );
};
