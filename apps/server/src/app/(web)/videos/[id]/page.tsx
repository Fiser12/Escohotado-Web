import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { VideoDetail } from "gaudi/server";
import { NextPage } from "next/types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { COLLECTION_SLUG_VIDEO } from '@/payload/collections/config';
import { fetchPermittedContentQuery } from '@/core/auth/permissions/fetchPermittedContentQuery';
import { mapAnyToComment } from 'hegel';

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


  return (
    <div>
      <VideoDetail
        videoHref={href}
        title={video.title ?? "No title"}
        publishedAt={video.publishedAt as string}
        duration={video.duration ?? 0}
        categories={[]}
        commentsSectionModel={mapAnyToComment(video.forum_post_id, video.last_forum_posts ?? [])}
        >
        {video.content &&
          <LexicalRenderer className="max-w-[48rem] mx-auto" data={video.content} />
        }
      </VideoDetail>
    </div>
  );
};

export default Page;

