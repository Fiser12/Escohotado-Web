import { VideoDetail } from '@/components/pages/video_page/detalle';
import { COLLECTION_SLUG_VIDEO } from '@/core/collections-slugs';
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { servicesProd } from '@/modules/services';
import { getPayload } from '@/payload/utils/get-payload';
import { NextPage } from "next/types";

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

  return <VideoDetail user={user} video={video} quotes={[]}>
    {video.content &&
      <LexicalRenderer
        className="max-w-[48rem] mx-auto"
        data={video.content}
        services={servicesProd}
      />
    }
  </VideoDetail>
};

export default Page;

