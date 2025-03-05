import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, H4, SubscriptionsGroupCard } from "gaudi/server";
import { Subscription } from "payload-types";
import { signIn } from '@/payload/plugins/authjs/plugin';
import classNames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

export const SubscriptionsSection: React.FC<Props> = async ({...rest}) => {
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  const products = await payload.find({
    collection: "products",
    where: {
      active: { equals: true },
    },
  })
  const className = classNames("space-y-6 gap-2 flex flex-col items-center", rest.className)

  return (
    <ContentWrapper
      className={className}
      backgroundClassname="bg-white"
    >
      <H2 label="Elige tu plan y accede al legado Escohotado." className='text-center'/>
      <H4 label="Descubre videos, artículos y textos exclusivos." />
      <p className="text-center text-cyan-950 text-base font-normal font-['Montserrat'] leading-normal">
        También puedes elegir la modalidad de pago que mejor se adapte a ti.
      </p>
      <SubscriptionsGroupCard
        signIn={async () => {
          "use server";
          await signIn("keycloak");
        }}
        loggedIn={!!user}
        products={products.docs}
        subscription={user?.subscription?.docs
          ?.cast<Subscription>()
          ?.at(0)
        }
      />
    </ContentWrapper>
  );
};

