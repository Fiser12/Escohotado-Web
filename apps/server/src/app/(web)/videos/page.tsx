import { VideoPageList } from '@/components/pages/video_page/list';
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { getVideosQueryByTagsWithCache } from "@/core/queries/get-videos-query";
import { servicesProd } from '@/modules/services';
import { getPayload } from '@/payload/utils/get-payload';
import { createSearchParamsCache, parseAsString } from "nuqs/server";

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

