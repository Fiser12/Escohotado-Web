"use client";

import { GridCards } from "@/components/organisms/lexical/grid_cards/GridCards";
import { mapArticleCard } from "@/core/mappers/map-cards";
import { convertContentModelToCard } from "hegel";
import { BaseUser } from "payload-access-control";
import { ArticleWeb } from "payload-types";
import { useEffect, useRef, useState } from "react";
import { Services } from "../services";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user?: BaseUser | null;
    query: string;
    tagsArrays: string[];
    maxPage: number;
    contentServices: Services["content"];
}

export const DynamicLoadingArticles: React.FC<Props> = ({ query, tagsArrays, maxPage, user, className, contentServices, ...rest }) => {
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
                const newArticles = await contentServices.articles.getArticlesQueryByTags(query, tagsArrays, page);
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
    }, [page, maxPage, query, tagsArrays, contentServices]);

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