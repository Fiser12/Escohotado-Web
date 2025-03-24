import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { DetailBottomSection, VideoDetail } from "gaudi/server";
import { NextPage } from "next/types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { COLLECTION_SLUG_VIDEO, routes } from 'hegel/payload';
import { mapAnyToComment } from 'hegel';
import { mapQuoteCard } from '@/core/mappers/mapCards';
import { Quote } from 'payload-types';
import { evalPermissionByRoleQuery, fetchPermittedContentQuery } from "payload-access-control";
import { SEOContentWrapper } from 'gaudi/client';

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

