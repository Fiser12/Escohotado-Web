import { MainButton } from "@/components/atoms/main-button";
import { Tag } from "@/components/atoms/tag";
import { Typo } from "@/components/atoms/typographies";
import { ContentWrapper } from "@/components/layout/content-wrapper";
import { UnlocksProgress } from "@/components/organisms/subscription/unlocks-progress.organism";
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { getAccountType } from '@/core/queries/get-account-type';
import { routes } from "@/core/routes-generator";
import { NewsletterToggleButton } from "@/modules/payload-admin/newsletter-toggle-button";
import { signOut } from "@/payload/plugins/authjs/plugin";
import { getPayload } from "@/payload/utils/get-payload";

const Page = async () => {
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  if (!user) return null

  const accountType = getAccountType(user);
  return (
    <ContentWrapper className="flex flex-col items-right gap-6 pt-10">
      <Typo.H1 className="text-2xl font-bold">Preferencias de la cuenta</Typo.H1>
      <div className="flex flex-row gap-6">
        <Typo.H4 className="self-center">Subscripción a la newsletter</Typo.H4>
        <NewsletterToggleButton newsletterIsActive={user.isSubscribedToNewsletter} />
      </div>
      <div className="flex flex-row gap-6 items-center">
        <Typo.P>Tipo de cuenta: </Typo.P>
        <Tag text={accountType}></Tag>
        {accountType === "Freemium" && (
          <UnlocksProgress user={user} className="flex-grow mr-4" />
        )}
        <a href={routes.nextJS.subscriptionPageHref}>
          <MainButton className="max-w-60" text="Gestionar subscripción" />
        </a>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <a href={routes.keycloak.account}>
          <MainButton className="max-w-60" text="Cambiar datos de usuario" />
        </a>
        <a href={routes.keycloak.changePassword}>
          <MainButton text="Cambiar contraseña" />
        </a>
        <a href={routes.keycloak.security}>
          <MainButton text="Seguridad" />
        </a>
      </div>
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
