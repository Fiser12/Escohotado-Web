import React from "react";
import { Header } from "gaudi/server";
import { signIn, signOut } from "@/payload/plugins/authjs/plugin";
import { NuqsAdapter } from 'nuqs/adapters/next'
import { getAccountMenuQuery } from "@/core/auth/payloadUser/getAccounMenuQuery";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { Textures } from "gaudi/client";
import "../tailwind.css";
import { routes } from "hegel";

const Layout: React.FC<{ children: React.ReactNode, modal?: React.ReactNode }> = async ({ children, modal }) => {
  const payloadUser = await getCurrentUserQuery()
  return (
    <html>
      <head>
        <title>A. Escohotado</title>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

      </head>
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
              await signOut({redirectTo: routes.homePageHref});
            }}
            menuSections={getAccountMenuQuery(payloadUser)}
          />
          {modal}
          {children}
        </NuqsAdapter>
        { Textures.map((Element, index) => <Element key={index} />)}
      </body>
    </html>
  );
};

export default Layout;
