import React from "react";
import { Header } from "gaudi/server";
import { signIn, signOut } from "@/plugins/authjs/plugin";
import { getPayloadUser } from "@/plugins/authjs/getPayloadUser";
import { DataFromCollectionSlug } from "payload";
import { NuqsAdapter } from 'nuqs/adapters/next'
import "../tailwind.css";
import { getAccountMenuQuery } from "@/utils/payload/queries/getAccounMenuQuery";

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
            menuSections={getAccountMenuQuery(payloadUser)}
          />
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default Layout;
