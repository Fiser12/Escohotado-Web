import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { MainButton } from "gaudi/client";

const Page = async () => {
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  if (!user) return null

  return (
    <div>
         <a>
            <MainButton text="Cambiar datos de usuario">

            </MainButton>
        </a>

        <a>
            <MainButton text="Cambiar contraseña">

            </MainButton>
        </a>

        <a href={`https://${process.env.KC_HOSTNAME}`}>
            <MainButton text="Seguridad">

            </MainButton>
        </a>

    </div>
  );
};

export default Page;
