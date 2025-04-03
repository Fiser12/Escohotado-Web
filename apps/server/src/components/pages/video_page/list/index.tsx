import { Typo } from '@/components/atoms/typographies';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { GridCards } from "@/components/organisms/lexical/grid_cards";
import { mapVideoCard } from "@/core/mappers/map-cards";
import { ResultVideo, VideosQueryResult } from "@/core/queries/get-videos-query";
import { DynamicLoadingVideos } from '@/modules/dynamic-loading-lists/dynamic-loading-videos';
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { SortSelector, VideoFilterBar } from '@/modules/nuqs';
import { Services } from '@/modules/services';
import { convertContentModelToCard } from "hegel";
import { BaseUser } from "payload-access-control";
import { VideosPage } from "payload-types";

interface Props {
    user: BaseUser | null;
    videosDataPage: VideosPage;
    videosResult: VideosQueryResult;
    lastVideosResult: VideosQueryResult;
    sort: string;
    query: string;
    playlist: string;
    services: Services;
}

export const VideoPageList = ({
    user,
    videosDataPage,
    videosResult,
    lastVideosResult,
    sort,
    query,
    playlist,
    services,
}: Props) => {
    const videoCardMapper = (video: ResultVideo) => mapVideoCard(user)(video);

    return <div className='flex flex-col'>
        <LexicalRenderer data={videosDataPage.content} services={services} />
        <ContentWrapper
            className="flex flex-col gap-y-5 relative pt-20"
            backgroundClassname="bg-white"
        >
            <VideoFilterBar />
            {lastVideosResult.results.length !== 0 && <>
                <Typo.H2 className='w-full'>Últimos vídeos</Typo.H2>
                <GridCards className='grid-cols-2 md:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-6'
                    features={lastVideosResult.results
                        .slice(0, 3)
                        .map(videoCardMapper)
                        .map(convertContentModelToCard("col-span-2"))
                    }
                />
            </>}
            <div className="flex flex-col sm:flex-row gap-10 items-end justify-between">
                <Typo.H2 className='w-full'>Todos los vídeos</Typo.H2>
                <SortSelector />
            </div>
            <GridCards
                features={videosResult.results
                    .map(videoCardMapper)
                    .map(convertContentModelToCard("col-span-2"))}
                className='grid-cols-2 md:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-10'
            />
            <DynamicLoadingVideos
                contentServices={services.content}
                sortedBy={sort}
                playlist={playlist}
                query={query}
                user={user}
                maxPage={videosResult.maxPage}
            />
        </ContentWrapper>
    </div>
};
