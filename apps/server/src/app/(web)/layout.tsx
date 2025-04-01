import { Textures } from "@/components/assets/textures";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header/header";
import { UnlocksProgress } from "@/components/organisms/subscription/unlocks-progress.organism";
import { getAccountMenuQuery } from "@/core/queries/get-account-menu-query";
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { routes } from "@/core/routes-generator";
import { signIn, signOut } from "@/payload/plugins/authjs/plugin";
import { getPayload } from "@/payload/utils/get-payload";
import { MenuItem } from "hegel";
import { NuqsAdapter } from 'nuqs/adapters/next';
import { evalPermissionByRoleQuery } from "payload-access-control";
import { loadPayloadSingleton } from "payload-base-singleton";
import React from "react";
import "../tailwind.css";
import "./main.css";

const logoutMenuItem: MenuItem = {
  text: "Cerrar sesión",
  action: async () => {
    "use server";
    await signOut({ redirectTo: routes.nextJS.homePageHref });
  },
  target: "_black",
  href: routes.keycloak.logout
}

const navItemList: (hasPermission: Boolean) => MenuItem[] = (hasPermission) => {
  let items = [
    { href: routes.nextJS.lecturasPageHref, tabindex: 2, text: "Lecturas" },
    { href: routes.nextJS.videosPageHref, tabindex: 3, text: "Videos" },
    { href: routes.nodeBB.root, tabindex: 4, text: "Foro" },
  ]
  loadPayloadSingleton(getPayload)

  if (hasPermission) {
    items.push({
      href: routes.nextJS.citasPageHref,
      tabindex: 5,
      text: "Citas"
    })
  }
  return items
}

const Layout: React.FC<{ children: React.ReactNode, modal?: React.ReactNode }> = async ({ children, modal }) => {
  const payloadUser = await getCurrentUserQuery()
  const hasPermission = evalPermissionByRoleQuery(payloadUser, 'basic');
  return (
    <html>
      <head>
        <title>A. Escohotado</title>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key={process.env.AHREFS_PUBLIC_KEY} async></script>
        <meta name="ahrefs-site-verification" content={process.env.AHREF_VERIFICATION_KEY} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <NuqsAdapter>
          <Header
            user={payloadUser}
            pageItems={navItemList(hasPermission)}
            signIn={async () => {
              "use server";
              await signIn("keycloak");
            }}
            logoutMenuItem={logoutMenuItem}
            menuSections={getAccountMenuQuery(payloadUser)}
          />
          {modal}
          <main className="flex flex-col flex-grow">
            {children}
          </main>
          {
            payloadUser && (
              <UnlocksProgress user={payloadUser} className="flex-grow mr-4" />
            )
          }

          <Footer
            youtubeHref={routes.otherExternal.youtube}
            xHref={routes.otherExternal.x}
            facebookHref={routes.otherExternal.facebook}
            instagramHref={routes.otherExternal.instagram}
            tiktokHref={routes.otherExternal.tiktok}
            ivooxHref={routes.otherExternal.ivoox}
            privacidadHref={routes.nextJS.privacidadPageHref}
            termsAndConditionsHref={routes.nextJS.termsAndConditionsPageHref}
          />
        </NuqsAdapter>
        {Textures.map((Element, index) => <Element key={index} />)}
      </body>
    </html>
  );
};

export default Layout;
