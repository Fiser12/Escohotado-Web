import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { DetailBottomSection, VideoDetail } from "gaudi/server";
import { NextPage } from "next/types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { COLLECTION_SLUG_VIDEO } from 'hegel/payload';
import { fetchPermittedContentQuery } from '@/core/auth/permissions/fetchPermittedContentQuery';
import { mapAnyToComment } from 'hegel';
import { generateDetailHref, mapQuoteCard } from '@/core/domain/mapping/mapCards';
import { Quote } from 'payload-types';
import { evalPermissionQuery } from '@/core/auth/permissions/evalPermissionQuery';

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
  const hasPermissions = evalPermissionQuery(user, 'basic');
  const quotes = (video?.quotes?.docs ?? [])
    .slice(0, hasPermissions ? 3 : 0)
    .cast<Quote>()

  return (
    <VideoDetail
      videoHref={href}
      title={video.title ?? "No title"}
      detailHref={generateDetailHref({ relationTo: "video", value: video })}
      publishedAt={video.publishedAt as string}
      duration={video.duration ?? 0}
      categories={[]}
    >
      {video.content &&
        <LexicalRenderer className="max-w-[48rem] mx-auto" data={video.content} />
      }
      <DetailBottomSection
        quotesModel={quotes.mapNotNull(mapQuoteCard)}
        commentsSectionModel={mapAnyToComment(video.forum_post_id, video.last_forum_posts ?? [])}
      />
    </VideoDetail>
  );
};

export default Page;

