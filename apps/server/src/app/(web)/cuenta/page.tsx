import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { MainButton } from "gaudi/client";
import { ContentWrapper, H1 } from "gaudi/server";
import { signOut } from "@/payload/plugins/authjs/plugin";
import { routes } from "hegel";

const Page = async () => {
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  if (!user) return null

  return (
    <ContentWrapper className="flex flex-col items-right gap-6 pt-10">
      <H1 className="text-2xl font-bold" label="Preferencias de la cuenta" />
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
          await signOut({redirectTo: routes.homePageHref});
        }}
      >
        <MainButton text="Cerrar sesión" />
      </a>

    </ContentWrapper>
  );
};

export default Page;
