"use client";

import { getArticlesQueryByTags } from "@/core/queries/getArticlesQuery";
import { mapArticleCard } from "@/core/mappers/mapCards";
import { convertContentModelToCard } from "hegel";
import { ArticleWeb } from "payload-types";
import { useEffect, useRef, useState } from "react";
import { BaseUser } from "payload-access-control";
import { GridCards } from "@/components/content/grid_cards/GridCards";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user: BaseUser | null;
    query: string;
    tagsArrays: string[];
    maxPage: number;
}

export const DynamicLoadingArticles: React.FC<Props> = ({ query, tagsArrays, maxPage, user, className, ...rest }) => {
    const [articles, setArticles] = useState<Record<string, ArticleWeb[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const articleCardMapper = (article: ArticleWeb) => mapArticleCard(user)(article);

    useEffect(() => {
        const loadArticles = async () => {
            if (page === null || page > maxPage || page == 0) return
            try {
                setLoading(true);
                const newArticles = await getArticlesQueryByTags(query, tagsArrays, page);
                setArticles((prev) => {
                    return {
                        ...prev,
                        [page]: newArticles.results
                    }
                });
            } catch (error) {
                console.error("Error loading articles:", error);
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, [page, maxPage, query, tagsArrays]);

    useEffect(() => {
        setArticles({});
        setPage(0);
    }, [query, tagsArrays]);

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
        <GridCards
            {...rest}
            features={Object
                .values(articles)
                .flat()
                .map(articleCardMapper)
                .map(convertContentModelToCard("col-span-2"))
            }
            className={`grid-cols-2 md:grid-cols-6 lg:grid-cols-8 ` + (className ?? "")}
        />
        <div ref={observerRef} style={{ height: "20px", background: "transparent" }}></div>
        {loading && <p>Loading more articles...</p>}
    </div>
}