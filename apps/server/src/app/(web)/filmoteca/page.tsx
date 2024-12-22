import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, ArticleCard } from "gaudi/server";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { PaginationBarNuqs } from "@/ui/pagination_bar_nuqs";
import { ContentGridList } from "gaudi/server";
import { SearchBarNuqs } from "@/ui/search_bar_nuqs";
import { getVideosQuery } from "@/core/content/getVideosQuery";
import { fetchPermittedContentQuery } from '@/core/auth/permissions/fetchPermittedContentQuery';

export const pageSize = 10;

export const searchContentParamsCache = createSearchParamsCache({
  page: parseAsString.withDefault('1'),
  query: parseAsString.withDefault(''),
  temas: parseAsString.withDefault('')
})

interface Props {
  searchParams: Record<string, string>;
}

const Page = async ({ searchParams }: Props) => {
  const payload = await getPayload();
  const { page, query } = await searchContentParamsCache.parse(searchParams)
  const [user, videosResult] = await Promise.all([
    getCurrentUserQuery(payload),
    getVideosQuery(query, parseInt(page) - 1)
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
      <div>
        <ContentGridList
          items={videosResult.results}
          renderBox={(video, index) => {
            const content = fetchPermittedContentQuery(
              user, 
              video.permissions_seeds ?? "",
              video.url,
              video.url_free
            )

            return <ArticleCard
              key={index}
              title={video.title ?? "No title"}
              href={content ?? "#"}
              publishedAt={video.publishedAt as string}
              coverHref={video.thumbnailUrl ?? "#"}
              textLink={"Ver vídeo"}
              categories={[]}
              hasPermission={content != null && content != ""}
            />
          }}
        />
      </div>
      <PaginationBarNuqs maxPage={videosResult.maxPage} />
    </ContentWrapper>
  );
};

export default Page;

