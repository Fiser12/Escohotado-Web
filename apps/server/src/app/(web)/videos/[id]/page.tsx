import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { NextPage } from "next/types";
import { LexicalRenderer } from "@/modules/lexical/lexicalRenderer";
import { COLLECTION_SLUG_VIDEO } from '@/core/collectionsSlugs';
import { VideoDetail } from '@/components/pages/video_page/detalle';

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
      <LexicalRenderer className="max-w-[48rem] mx-auto" data={video.content} />
    }
  </VideoDetail>
};

export default Page;

