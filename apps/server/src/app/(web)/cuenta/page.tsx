import { getPayload } from "@/payload/utils/getPayload";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { MainButton } from "gaudi/client";
import { ContentWrapper, H1, H4 } from "gaudi/server";
import { signOut } from "@/payload/plugins/authjs/plugin";
import { NewsletterToggleButton } from "@/modules/payload_admin/newsletter_toggle_button";
import { routes } from "@/core/routesGenerator";

const Page = async () => {
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  if (!user) return null

  return (
    <ContentWrapper className="flex flex-col items-right gap-6 pt-10">
      <H1 className="text-2xl font-bold" label="Preferencias de la cuenta" />
      <div className="flex flex-row gap-6">
        <H4 label="Subscripción a la newsletter" className="self-center" />
        <NewsletterToggleButton newsletterIsActive={user.isSubscribedToNewsletter} />
      </div>
      <a href={routes.nextJS.subscriptionPageHref}>
        <MainButton className="max-w-60" text="Gestionar subscripción" />
      </a>
      <a href={routes.keycloak.account}>
        <MainButton className="max-w-60" text="Cambiar datos de usuario" />
      </a>
      <a href={routes.keycloak.changePassword}>
        <MainButton text="Cambiar contraseña" />
      </a>

      <a href={routes.keycloak.security}>
        <MainButton text="Seguridad" />
      </a>
      <a 
        href={routes.keycloak.logout} 
        target="_blank" 
        onClick={async () => {
          "use server";
          await signOut({redirectTo: routes.nextJS.homePageHref});
        }}
      >
        <MainButton text="Cerrar sesión" />
      </a>
    </ContentWrapper>
  );
};

export default Page;
