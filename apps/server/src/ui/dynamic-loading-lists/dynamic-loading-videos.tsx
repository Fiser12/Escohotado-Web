"use client";

import { getVideosQuery, ResultVideo } from "@/core/content/getVideosQuery";
import { mapVideoCard } from "@/core/domain/mapping/mapCards";
import { convertContentModelToCard } from "hegel";
import { GridCardsBlockContainer, renderFeatured } from "node_modules/gaudi/src/content/featured_grid_home/GridCardsBlock";
import { User } from "payload-types";
import { useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user: User | null;
    query: string;
    playlist: string;
    sortedBy: string;
    maxPage: number;
}

export const DynamicLoadingVideos: React.FC<Props> = ({ query, maxPage, user, sortedBy, playlist, className, ...rest }) => {
    const [videos, setVideos] = useState<Record<string, ResultVideo[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const videoCardMapper = (video: ResultVideo) => mapVideoCard(user)(video);

    useEffect(() => {
        const load = async () => {
            if (page === null || page > maxPage || page == 0) return
            try {
                setLoading(true);
                const newVideos = await getVideosQuery(query, playlist, page, sortedBy);
                setVideos((prev) => ({
                    ...prev,
                    [page]: newVideos.results
                }));
            } catch (error) {
                console.error("Error loading articles:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [page, maxPage, query, sortedBy, playlist]);

    useEffect(() => {
        setVideos({});
        setPage(0);
    }, [query, playlist, sortedBy]);

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
            className={'grid-cols-2 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10 ' + (className ?? "")}
        >
            {Object
                .values(videos)
                .flat()
                .map(videoCardMapper)
                .map(convertContentModelToCard("col-span-2"))
                .map(renderFeatured)
            }
        </GridCardsBlockContainer>
        <div ref={observerRef} style={{ height: "20px", background: "transparent" }}></div>
        <div>
            {loading && <p>Loading more videos...</p>}
        </div>
    </div>
}