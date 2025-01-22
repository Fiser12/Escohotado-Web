import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2 } from "gaudi/server";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { SearchBarNuqs } from "@/ui/search_bar_nuqs";
import { getVideosQuery, ResultVideo } from "@/core/content/getVideosQuery";
import { DynamicLoadingVideos } from '@/ui/dynamic-loading-lists/dynamic-loading-videos';
export const pageSize = 10;
import { mapVideoCard } from '@/core/domain/mapping/mapCards';
import { GridCardsBlockContainer, renderFeatured } from 'node_modules/gaudi/src/content/featured_grid_home/GridCardsBlock';

export const searchContentParamsCache = createSearchParamsCache({
  query: parseAsString.withDefault(''),
  temas: parseAsString.withDefault('')
})

interface Props {
  searchParams: Record<string, string>;
}

const Page = async ({ searchParams }: Props) => {
  const payload = await getPayload();
  const { query } = await searchContentParamsCache.parse(searchParams)
  const [user, videosResult] = await Promise.all([
    getCurrentUserQuery(payload),
    getVideosQuery(query, 0)
  ]);
  const videoCardMapper = (video: ResultVideo) => mapVideoCard(user)(video, "col-span-2");

  return (
    <ContentWrapper
      className="flex flex-col gap-y-5 relative"
      backgroundClassname="bg-white"
    >
      <H2 label="Vídeos" />
      <div className="flex flex-row gap-x-2">
        <SearchBarNuqs />
      </div>
      <GridCardsBlockContainer
        gridClassname='grid-cols-2 md:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-10'
      >
        {videosResult.results
          .map(videoCardMapper)
          .map(renderFeatured)}
      </GridCardsBlockContainer>
      <DynamicLoadingVideos
        query={query}
        user={user}
        maxPage={videosResult.maxPage}
      />
    </ContentWrapper>
  );
};

export default Page;

