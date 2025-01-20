"use client";

import { getVideosQuery, ResultVideo } from "@/core/content/getVideosQuery";
import { ArticleCard, ContentGridList } from "gaudi/client";
import { useEffect, useRef, useState } from "react";

interface Props {
    query: string;
    maxPage: number;
}

export const DynamicLoadingVideos: React.FC<Props> = ({ query, maxPage }) => {
    const [videos, setVideos] = useState<Record<string, ResultVideo[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loadArticles = async () => {
            if (page === null || page > maxPage || page == 0) return
            try {
                setLoading(true);
                const newVideos = await getVideosQuery(query, page);
                setVideos((prev) => {
                    return {
                        ...prev,
                        [page]: newVideos.results
                    }
                });
            } catch (error) {
                console.error("Error loading articles:", error);
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, [page, maxPage, query]);

    useEffect(() => {
        setVideos({});
        setPage(0);
    }, [query]);

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
            items={Object.values(videos).flat()}
            renderBox={(video) => <ArticleCard
                key={video.id}
                title={video.title ?? "No title"}
                href={video.allowedHref ?? "#"}
                publishedAt={video.publishedAt ?? ""}
                coverHref={video.thumbnailUrl ?? "#"}
                textLink={"Ver vídeo"}
                categories={[]}
                hasPermission={video.allowedHref != null && video.allowedHref != ""}
            />}
        />
        <div ref={observerRef} style={{ height: "20px", background: "transparent" }}></div>
        {loading && <p>Loading more articles...</p>}
    </div>
}