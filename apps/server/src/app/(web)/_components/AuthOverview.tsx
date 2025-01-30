import { auth } from "@/payload/plugins/authjs/plugin";
import { ContentWrapper, H3, H4 } from "gaudi/server";
import { getPayload } from '@/payload/utils/getPayload';
import { COLLECTION_SLUG_MEDIA } from "hegel/payload";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";

const AuthOverview = async () => {
  const session = await auth();
  const payloadUser = await getCurrentUserQuery()
  const payload = await getPayload();
  const medias = await payload.find({
    collection: COLLECTION_SLUG_MEDIA,
  })
  return (
    <ContentWrapper>
      <div style={{ background: "gray", padding: "5px", borderRadius: "10px" }}>
        {JSON.stringify(session?.user, null, 2)}
      </div>
      <br />
      <H3 label={"Payload CMS"} />
      <div style={{ background: "gray", padding: "5px", borderRadius: "10px" }}>
        {JSON.stringify(payloadUser, null, 2)}
      </div>
      <H4 label={"Medias"} />
      <div style={{ background: "gray", padding: "5px", borderRadius: "10px" }}>
        {JSON.stringify(medias, null, 2)}
      </div>
    </ContentWrapper>
  );
};

export default AuthOverview;
