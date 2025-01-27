import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2 } from "gaudi/server";
import { convertContentModelToCard } from "hegel";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { SearchBarNuqs } from "@/ui/nuqs/search_bar_nuqs";
import { getVideosQueryByTags, ResultVideo } from "@/core/content/getVideosQuery";
import { DynamicLoadingVideos } from '@/ui/dynamic-loading-lists/dynamic-loading-videos';
export const pageSize = 10;
import { mapVideoCard } from '@/core/domain/mapping/mapCards';
import { GridCardsBlockContainer, renderFeatured } from 'node_modules/gaudi/src/content/featured_grid_home/GridCardsBlock';
import { LexicalRenderer } from '@/lexical/lexicalRenderer';
import { SortSelectorSSR } from '@/ui/nuqs/sort_selector_ssr';
import { PlaylistsSelectorSSR } from '@/ui/nuqs/playlists_selector_ssr';

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
    getVideosQueryByTags(query, tags, 0, sort),
    getVideosQueryByTags(query, tags, 0, "publishedAt")
  ]);
  const videosDataPage = await payload.findGlobal({
    slug: "videos_page"
  })

  const videoCardMapper = (video: ResultVideo) => mapVideoCard(user)(video);

  return (
    <div className='flex flex-col'>
      {videosDataPage.content &&
        <LexicalRenderer data={videosDataPage.content} />
      }
      <ContentWrapper
        className="flex flex-col gap-y-5 relative pt-20"
        backgroundClassname="bg-white"
      >
        <div className="flex flex-col sm:flex-row gap-3 items-end sm:justify-end">
          <PlaylistsSelectorSSR />
          <SearchBarNuqs />
        </div>
        {lastVideosResult.results.length !== 0 && <>
          <H2 label="Últimos vídeos" />

          <GridCardsBlockContainer className='grid-cols-2 md:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-6'>
            {lastVideosResult.results
              .slice(0, 3)
              .map(videoCardMapper)
              .map(convertContentModelToCard("col-span-2"))
              .map(renderFeatured)}
          </GridCardsBlockContainer></>}
        <div className="flex flex-col sm:flex-row gap-10 items-end justify-between">
          <H2 label="Todos los vídeos" />
          <SortSelectorSSR />
        </div>
        <GridCardsBlockContainer
          className='grid-cols-2 md:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-10'
        >
          {videosResult.results
            .map(videoCardMapper)
            .map(convertContentModelToCard("col-span-2"))
            .map(renderFeatured)}
        </GridCardsBlockContainer>
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

