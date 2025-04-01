import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { convertContentModelToCard } from "hegel";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { getVideosQueryByTagsWithCache, ResultVideo } from "@/core/queries/getVideosQuery";
import { DynamicLoadingVideos } from '@/modules/dynamic-loading-lists/dynamic-loading-videos';
import { mapVideoCard } from '@/core/mappers/mapCards';
import { LexicalRenderer } from "@/modules/lexical/renderer/lexicalRenderer";
import { SortSelector } from '@/modules/nuqs';
import { VideoFilterBar } from '@/modules/nuqs';
import { ContentWrapper } from '@/components/layout/content_wrapper/content_wrapper';
import { GridCards } from "@/components/organisms/lexical/grid_cards/GridCards";
import { Typo } from '@/components/atoms/typographies/Typographies';
import { servicesProd } from '@/modules/services';

export const pageSize = 10;

export const searchContentParamsCache = createSearchParamsCache({
  query: parseAsString.withDefault(''),
  playlist: parseAsString.withDefault(''),
  temas: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('popularity'),
})

interface Props {
  searchParams: Record<string, string>;
}

const Page = async ({ searchParams }: Props) => {
  const payload = await getPayload();
  const { query, sort, playlist } = await searchContentParamsCache.parse(searchParams)
  const tags = playlist != '' ? playlist.split(',') : []
  const [user, videosResult, lastVideosResult] = await Promise.all([
    getCurrentUserQuery(payload),
    getVideosQueryByTagsWithCache(query, tags, 0, sort),
    getVideosQueryByTagsWithCache(query, tags, 0, "publishedAt")
  ]);
  const videosDataPage = await payload.findGlobal({
    slug: "videos_page"
  })

  const videoCardMapper = (video: ResultVideo) => mapVideoCard(user)(video);

  return (
    <div className='flex flex-col'>
      {videosDataPage.content &&
        <LexicalRenderer data={videosDataPage.content} services={servicesProd} />
      }
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
          sortedBy={sort}
          playlist={playlist}
          query={query}
          user={user}
          maxPage={videosResult.maxPage}
        />
      </ContentWrapper>
    </div>
  );
};

export default Page;

