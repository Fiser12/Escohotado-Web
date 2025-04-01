import { MainButton } from "@/components/atoms/main_button/main_button";
import { Typo } from "@/components/atoms/typographies/Typographies";
import { ContentWrapper } from "@/components/layout/content_wrapper/content_wrapper";
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { routes } from "@/core/routes-generator";
import { NewsletterToggleButton } from "@/modules/payload-admin/newsletter-toggle-button";
import { signOut } from "@/payload/plugins/authjs/plugin";
import { getPayload } from "@/payload/utils/get-payload";

const Page = async () => {
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  if (!user) return null

  return (
    <ContentWrapper className="flex flex-col items-right gap-6 pt-10">
      <Typo.H1 className="text-2xl font-bold">Preferencias de la cuenta</Typo.H1>
      <div className="flex flex-row gap-6">
        <Typo.H4 className="self-center">Subscripción a la newsletter</Typo.H4>
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
          await signOut({ redirectTo: routes.nextJS.homePageHref });
        }}
      >
        <MainButton text="Cerrar sesión" />
      </a>
    </ContentWrapper>
  );
};

export default Page;
