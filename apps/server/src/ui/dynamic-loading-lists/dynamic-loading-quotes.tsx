"use client";

import { getQuotesQueryByTags } from "@/core/content/getQuotesQuery";
import { mapQuoteCard } from "@/core/domain/mapping/mapCards";
import { convertContentModelToCard } from "hegel";
import { GridCardsBlock } from "node_modules/gaudi/src/content/featured_grid_home/GridCardsBlock";
import { Quote, User } from "payload-types";
import { useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user: User | null;
    query: string;
    tags: string[];
    sortedBy: 'publishedAt' | 'popularity';
    maxPage: number;
}

export const DynamicLoadingQuotes: React.FC<Props> = ({ query, maxPage, user, sortedBy, tags, className, ...rest }) => {
    const [quotes, setQuotes] = useState<Record<string, Quote[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const load = async () => {
            if (page === null || page > maxPage || page == 0) return
            try {
                setLoading(true);
                const newQuotes = await getQuotesQueryByTags(query, tags, page, sortedBy);
                setQuotes((prev) => ({
                    ...prev,
                    [page]: newQuotes.results
                }));
            } catch (error) {
                console.error("Error loading articles:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [page, maxPage, query, sortedBy, tags]);

    useEffect(() => {
        setQuotes({});
        setPage(0);
    }, [query, tags, sortedBy]);

    useEffect(() => {
        const currentObserverRef = observerRef.current;
        if (!currentObserverRef) return;

        const observer = new IntersectionObserver(
            entries => entries[0].isIntersecting && !loading && page < maxPage && setPage(prev => prev + 1),
            { threshold: 0.5 }
        );

        observer.observe(currentObserverRef);

        return () => {
            observer.unobserve(currentObserverRef);
            observer.disconnect();
        };
    }, [loading, page, maxPage]);
    return <div>
        <GridCardsBlock
            {...rest}
            features={Object
                .values(quotes)
                .flat()
                .map(mapQuoteCard(user))
                .map(convertContentModelToCard("col-span-3"))}
            className={'grid-cols-3 md:grid-cols-6 lg:grid-cols-12 ' + (className ?? "")}
        />
        <div ref={observerRef} style={{ height: "20px", background: "transparent" }}></div>
        <div>
            {loading && <p>Loading more quotes...</p>}
        </div>
    </div>
}