import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, ArticleCard } from "gaudi/server";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { ContentGridList } from "gaudi/server";
import { SearchBarNuqs } from "@/ui/search_bar_nuqs";
import { getVideosQuery } from "@/core/content/getVideosQuery";
import { fetchPermittedContentQuery } from '@/core/auth/permissions/fetchPermittedContentQuery';
import { DynamicLoadingVideos } from '@/ui/dynamic-loading-lists/dynamic-loading-videos';

export const pageSize = 10;

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

  return (
    <ContentWrapper
      className="flex flex-col gap-y-5"
      backgroundClassname="bg-white"
    >
      <H2 label="Vídeos" />
      <div className="flex flex-row gap-x-2">
        <SearchBarNuqs />
      </div>
      <ContentGridList
        items={videosResult.results}
        renderBox={(video, index) => {
          return <ArticleCard
            key={index}
            title={video.title ?? "No title"}
            href={video.allowedHref ?? "#"}
            publishedAt={video.publishedAt as string}
            coverHref={video.thumbnailUrl ?? "#"}
            textLink={"Ver vídeo"}
            categories={[]}
            hasPermission={video.allowedHref != null && video.allowedHref != ""}
          />
        }}
      />
      <DynamicLoadingVideos
        query={query}
        maxPage={videosResult.maxPage}
      />
    </ContentWrapper>
  );
};

export default Page;

