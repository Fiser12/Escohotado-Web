import { DataFromCollectionSlug } from "payload";
import { auth } from "@/plugins/authjs/plugin";
import { getPayloadUser } from "@/plugins/authjs/getPayloadUser";
import { ContentWrapper } from "gaudi";
import { getPayload } from "@/utils/payload";
import { COLLECTION_SLUG_MEDIA } from "@/collections/config";

const AuthOverview = async () => {
  const session = await auth();
  const payloadUser = await getPayloadUser<DataFromCollectionSlug<"users">>();
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
      <h3>Payload CMS</h3>
      <div style={{ background: "gray", padding: "5px", borderRadius: "10px" }}>
        {JSON.stringify(payloadUser, null, 2)}
      </div>
      <h3>Medias</h3>
      <div style={{ background: "gray", padding: "5px", borderRadius: "10px" }}>
        {JSON.stringify(medias, null, 2)}
      </div>

    </ContentWrapper>
  );
};

export default AuthOverview;
