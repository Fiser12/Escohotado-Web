import { DataFromCollectionSlug } from "payload";
import { auth, signIn, signOut } from "@/plugins/authjs/plugin";
import { getPayloadUser } from "payload-authjs";
import { Header } from "gaudi";
import { accountMenuBuilder } from "@/domain/accountMenuBuilder";

const AuthOverview = async () => {
  const session = await auth();
  const payloadUser = await getPayloadUser<DataFromCollectionSlug<"users">>();

  return (
    <div>
      <Header
        user={payloadUser}
        signIn={async () => {
          "use server";
          await signIn("keycloak");
        }}
        signOut={async () => {
          "use server";
          await signOut();
        }}
        menuSections={accountMenuBuilder(payloadUser)}
      />
      <div style={{ background: "gray", padding: "5px", borderRadius: "10px" }}>
        {JSON.stringify(session?.user, null, 2)}
      </div>
      <br />
      <h3>Payload CMS</h3>
      <div style={{ background: "gray", padding: "5px", borderRadius: "10px" }}>
        {JSON.stringify(payloadUser, null, 2)}
      </div>
    </div>
  );
};

export default AuthOverview;
