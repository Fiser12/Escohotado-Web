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
import { VideoPageList } from '@/components/pages/video_page/list';

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
  const [user, videosResult, lastVideosResult, videosDataPage] = await Promise.all([
    getCurrentUserQuery(payload),
    getVideosQueryByTagsWithCache(query, tags, 0, sort),
    getVideosQueryByTagsWithCache(query, tags, 0, "publishedAt"),
    payload.findGlobal({ slug: "videos_page" })
  ]);

  return <VideoPageList
    user={user}
    videosDataPage={videosDataPage}
    videosResult={videosResult}
    lastVideosResult={lastVideosResult}
    sort={sort}
    query={query}
    playlist={playlist}
    services={servicesProd}
  />
};

export default Page;

