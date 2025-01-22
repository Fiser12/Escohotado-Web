import React from "react";
import { Header } from "gaudi/server";
import { signIn, signOut } from "@/payload/plugins/authjs/plugin";
import { NuqsAdapter } from 'nuqs/adapters/next'
import "../tailwind.css";
import { getAccountMenuQuery } from "@/core/auth/payloadUser/getAccounMenuQuery";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const payloadUser = await getCurrentUserQuery()

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
