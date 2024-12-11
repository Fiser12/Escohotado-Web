import { COLLECTION_SLUG_VIDEO } from "@/collections/config";
import { getCurrentUser, getPayload } from "@/utils/payload";
import { ContentWrapper, H2, ArticleCard } from "gaudi/server";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { YTTagsBarSSR } from "@/components/yt_tags_bar_ssr";
import { PaginationBarNuqs } from "@/components/pagination_bar_nuqs";
import { ContentGridList } from "gaudi/server";
import { SearchBarNuqs } from "@/components/search_bar_nuqs";
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
  const { temas, page, query } = await searchContentParamsCache.parse(searchParams)
  const [user, videosDocs] = await Promise.all([
    getCurrentUser(payload),
    payload.find({
      collection: COLLECTION_SLUG_VIDEO,
      sort: "-publishedAt"
    })
  ]);

  const temasArray = temas.split(',').filter(Boolean)
  const startIndex = (parseInt(page) - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let videos = videosDocs.docs
  .sort((a, b) => {
      const defaultDate = new Date(0).getTime();
      const dateA = new Date(a.publishedAt ?? defaultDate).getTime();
      const dateB = new Date(b.publishedAt ?? defaultDate).getTime();
      return dateB - dateA;
    })
    .filter(video => {
      const evalTemaFilter = temasArray.length === 0 || temasArray.every(seed => (video.tags as string[])?.includes(seed))
      const evalQueryFilter = query === null || query.trim() === '' || video.title?.toLowerCase().includes(query.toLowerCase())
      return evalTemaFilter && evalQueryFilter
    });
  const maxPage = Math.ceil(videos.length / pageSize);
  videos = videos.slice(startIndex, endIndex);

  return (
    <ContentWrapper
      className="flex flex-col gap-y-5"
      backgroundClassname="bg-white"
    >
      <H2 label="Vídeos" />
      <div className="flex flex-row gap-x-2">
        <YTTagsBarSSR />
        <SearchBarNuqs />
      </div>
      <div>
        <ContentGridList
          items={videos}
          renderBox={(video, index) => (
            <ArticleCard
              key={index}
              title={video.title ?? "No title"}
              href={video.url ?? "#"}
              publishedAt={video.publishedAt as string}
              coverHref={video.thumbnailUrl ?? "#"}
              textLink={"Ver vídeo"}
              categories={[]}
              hasPermission={true}
            />
          )}
        />
      </div>
      <PaginationBarNuqs maxPage={maxPage} />

    </ContentWrapper>
  );
};

export default Page;

