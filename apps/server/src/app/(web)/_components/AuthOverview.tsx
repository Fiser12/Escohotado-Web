import { DataFromCollectionSlug } from "payload";
import { auth } from "@/plugins/authjs/plugin";
import { getPayloadUser } from "payload-authjs";
import { ContentWrapper } from "gaudi";

const AuthOverview = async () => {
  const session = await auth();
  const payloadUser = await getPayloadUser<DataFromCollectionSlug<"users">>();
  
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
    </ContentWrapper>
  );
};

export default AuthOverview;
