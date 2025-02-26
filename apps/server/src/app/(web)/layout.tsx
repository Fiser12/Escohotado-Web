import React from "react";
import { Header } from "gaudi/server";
import { signIn, signOut } from "@/payload/plugins/authjs/plugin";
import { NuqsAdapter } from 'nuqs/adapters/next'
import { getAccountMenuQuery } from "@/core/auth/payloadUser/getAccounMenuQuery";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { Footer, Textures } from "gaudi/client";
import { routes } from "hegel";
import { evalPermissionQuery } from "@/core/auth/permissions/evalPermissionQuery";
import "../tailwind.css";

const Layout: React.FC<{ children: React.ReactNode, modal?: React.ReactNode }> = async ({ children, modal }) => {
  const payloadUser = await getCurrentUserQuery()
  const hasPermission = evalPermissionQuery(payloadUser, 'basic');
  return (
    <html>
      <head>
        <title>A. Escohotado</title>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key={process.env.AHREFS_PUBLIC_KEY} async></script>
        <meta name="ahrefs-site-verification" content={process.env.AHREF_VERIFICATION_KEY}/>
      </head>
      <body className="min-h-dvh flex flex-col">
        <NuqsAdapter>
          <Header
            hasPermission={hasPermission}
            user={payloadUser}
            signIn={async () => {
              "use server";
              await signIn("keycloak");
            }}
            signOut={async () => {
              "use server";
              await signOut({redirectTo: routes.nextJS.homePageHref});
            }}
            menuSections={getAccountMenuQuery(payloadUser)}
          />
          {modal}
          <main className="flex flex-col flex-1">
            {children}
          </main>
          <Footer />
        </NuqsAdapter>
        { Textures.map((Element, index) => <Element key={index} />)}
      </body>
    </html>
  );
};

export default Layout;
