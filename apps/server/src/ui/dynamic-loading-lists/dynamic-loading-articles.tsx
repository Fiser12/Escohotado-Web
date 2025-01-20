"use client";

import { CommonArticle, getArticlesQuery } from "@/core/content/getArticlesQuery";
import { COLLECTION_SLUG_ARTICLE_PDF } from "@/core/infrastructure/payload/collections/config";
import { ArticleCard, ContentGridList } from "gaudi/client";
import { Media, Taxonomy } from "payload-types";
import { useEffect, useRef, useState } from "react";

interface Props {
    query: string;
    medioArray: string[];
    autor: string | null;
    maxPage: number;
}

export const DynamicLoadingArticles: React.FC<Props> = ({ query, autor, medioArray, maxPage }) => {
    const [articles, setArticles] = useState<Record<string, CommonArticle[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const observerRef = useRef<HTMLDivElement | null>(null);

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
            { threshold: 1.0 }
        );

        observer.observe(currentObserverRef);
        
        return () => {
            observer.unobserve(currentObserverRef);
            observer.disconnect();
        };
    }, [loading, page, maxPage]);

    return <div>
        <ContentGridList
            items={Object.values(articles).flat()}
            renderBox={(article) => <ArticleCard
                key={article.id}
                title={article.title ?? "No title"}
                href={article.url ?? "#"}
                publishedAt={article.publishedAt ?? ""}
                coverHref={(article.cover as Media | null)?.url ?? "#"}
                textLink={article.type === COLLECTION_SLUG_ARTICLE_PDF ? "Descargar" : "Leer más"}
                categories={(article.categories ?? []) as Taxonomy[]}
                hasPermission={article.hasPermission}
            />}
        />
        <div ref={observerRef} style={{ height: "20px", background: "transparent" }}></div>
        {loading && <p>Loading more articles...</p>}
    </div>
}