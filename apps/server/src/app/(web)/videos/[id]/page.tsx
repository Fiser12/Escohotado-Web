import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { NextPage } from "next/types";
import { LexicalRenderer } from "@/modules/lexical/lexicalRenderer";
import { mapAnyToComment } from 'hegel';
import { mapQuoteCard } from '@/core/mappers/mapCards';
import { evalPermissionByRoleQuery, fetchPermittedContentQuery } from "payload-access-control";
import { COLLECTION_SLUG_VIDEO } from '@/core/collectionsSlugs';
import { routes } from '@/core/routesGenerator';
import { SEOContentWrapper } from '@/components/common/seo_content_wrapper';
import { VideoDetail } from '@/components/content/pages/video_page/detalle';
import { DetailBottomSection } from '@/components/common/detail_bottom_section';

interface Props {
  params: {
    id: string;
  };
}
const Page: NextPage<Props> = async (props) => {
  const { id } = await props.params;

  const payload = await getPayload();
  const [user, video] = await Promise.all([
    getCurrentUserQuery(payload),
    payload.findByID({
      collection: COLLECTION_SLUG_VIDEO,
      id
    })
  ]);
  const href = fetchPermittedContentQuery(
    user,
    video.permissions_seeds ?? '',
    video.url,
    video.url_free,
  )
  const hasPermissions = evalPermissionByRoleQuery(user, 'basic');

  return <SEOContentWrapper
    title={video?.title ?? "No title"}
    description={""}
    imageHref={video?.thumbnailUrl ?? "#"}
    ogType="video"
  >
    <VideoDetail
      subscriptionPageHref={routes.nextJS.subscriptionPageHref}
      videoHref={href}
      title={video.title ?? "No title"}
      detailHref={routes.nextJS.generateDetailHref({ collection: "video", value: video })}
      publishedAt={video.publishedAt as string}
      duration={video.duration ?? 0}
      categories={[]}
    >
      {video.content &&
        <LexicalRenderer className="max-w-[48rem] mx-auto" data={video.content} />
      }
      <DetailBottomSection
        quotesModel={[].mapNotNull(mapQuoteCard(user))}
        commentsSectionModel={mapAnyToComment(video.forum_post_id, video.last_forum_posts ?? [])}
      />
    </VideoDetail>
  </SEOContentWrapper>
};

export default Page;

