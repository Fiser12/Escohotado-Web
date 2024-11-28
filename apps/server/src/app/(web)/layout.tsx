import React from "react";
import "../../tailwind.css";
import { Header } from "gaudi";
import { signIn, signOut } from "@/plugins/authjs/plugin";
import { accountMenuBuilder } from "@/domain/accountMenuBuilder";
import { getPayloadUser } from "@/plugins/authjs/getPayloadUser";
import { DataFromCollectionSlug } from "payload";
import { NuqsAdapter } from 'nuqs/adapters/next'

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const payloadUser = await getPayloadUser<DataFromCollectionSlug<"users">>();

  return (
    <html>
      <body>
        <NuqsAdapter>
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
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default Layout;
