"use client";

import { CommonArticle, getArticlesQuery } from "@/core/content/getArticlesQuery";
import { mapArticleCard } from "@/core/domain/mapping/mapCards";
import { convertFeaturedToFeaturedCard } from "gaudi/client";
import { GridCardsBlockContainer, renderFeatured } from "node_modules/gaudi/src/content/featured_grid_home/GridCardsBlock";
import { User } from "payload-types";
import { useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user: User | null;
    query: string;
    medioArray: string[];
    autor: string | null;
    maxPage: number;
}

export const DynamicLoadingArticles: React.FC<Props> = ({ query, autor, medioArray, maxPage, user, className, ...rest }) => {
    const [articles, setArticles] = useState<Record<string, CommonArticle[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const articleCardMapper = (article: CommonArticle) => mapArticleCard(user)(article);

    useEffect(() => {
        const loadArticles = async () => {
            if (page === null || page > maxPage || page == 0) return
            try {
                setLoading(true);
                const newArticles = await getArticlesQuery(query, autor, medioArray, page);
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
    }, [page, maxPage, query, autor, medioArray]);

    useEffect(() => {
        setArticles({});
        setPage(0);
    }, [query, autor, medioArray]);

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
        <GridCardsBlockContainer
            {...rest}
            className={`grid-cols-2 md:grid-cols-6 lg:grid-cols-8 ` + (className ?? "")}
        >
            {Object
                .values(articles)
                .flat()
                .map(articleCardMapper)
                .map(convertFeaturedToFeaturedCard("col-span-2"))
                .map(renderFeatured)
            }
        </GridCardsBlockContainer>
        <div ref={observerRef} style={{ height: "20px", background: "transparent" }}></div>
        {loading && <p>Loading more articles...</p>}
    </div>
}