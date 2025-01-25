import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2 } from "gaudi/server";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { SearchBarNuqs } from "@/ui/nuqs/search_bar_nuqs";
import { getVideosQuery, ResultVideo } from "@/core/content/getVideosQuery";
import { DynamicLoadingVideos } from '@/ui/dynamic-loading-lists/dynamic-loading-videos';
export const pageSize = 10;
import { mapVideoCard } from '@/core/domain/mapping/mapCards';
import { GridCardsBlockContainer, renderFeatured } from 'node_modules/gaudi/src/content/featured_grid_home/GridCardsBlock';
import { LexicalRenderer } from '@/lexical/lexicalRenderer';
import { SortSelectorSSR } from '@/ui/nuqs/sort_selector_ssr';

export const searchContentParamsCache = createSearchParamsCache({
  query: parseAsString.withDefault(''),
  temas: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('popularity'),
})

interface Props {
  searchParams: Record<string, string>;
}

const Page = async ({ searchParams }: Props) => {
  const payload = await getPayload();
  const { query, sort } = await searchContentParamsCache.parse(searchParams)
  const [user, videosResult, lastVideosResult] = await Promise.all([
    getCurrentUserQuery(payload),
    getVideosQuery(query, 0, sort),
    getVideosQuery(query, 0, "publishedAt")
  ]);
  const videosDataPage = await payload.findGlobal({
    slug: "videos_page"
  })

  const videoCardMapper = (video: ResultVideo) => mapVideoCard(user)(video, "col-span-2");

  return (
    <div className='flex flex-col'>
      { videosDataPage.content &&
        <LexicalRenderer data={videosDataPage.content} />
      }
      <ContentWrapper
        className="flex flex-col gap-y-5 relative pt-20"
        backgroundClassname="bg-white"
      >
        <H2 label="Últimos vídeos" />
        <GridCardsBlockContainer
          gridClassname='grid-cols-2 md:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-6'
        >
          {lastVideosResult.results
            .slice(0, 3)
            .map(videoCardMapper)
            .map(renderFeatured)}
        </GridCardsBlockContainer>
        <H2 label="Todos los vídeos" />
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <SearchBarNuqs />
          <SortSelectorSSR />
        </div>
        <GridCardsBlockContainer
          gridClassname='grid-cols-2 md:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-10'
        >
          {videosResult.results
            .map(videoCardMapper)
            .map(renderFeatured)}
        </GridCardsBlockContainer>
        <DynamicLoadingVideos
          sortedBy={sort}
          query={query}
          user={user}
          maxPage={videosResult.maxPage}
        />
      </ContentWrapper>
    </div>
  );
};

export default Page;

