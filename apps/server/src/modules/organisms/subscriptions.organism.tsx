import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { signIn } from '@/payload/plugins/authjs/plugin';
import classNames from 'classnames';
import { UserInventory } from 'payload-access-control';
import { ContentWrapper } from '@/components/common/content_wrapper/content_wrapper';
import { H2 } from '@/components/common/headers/H2';
import { H4 } from '@/components/common/headers/H4';
import { SubscriptionsGroupCard } from '@/components/subscription/subscriptions_card_group';

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

export const SubscriptionsSection: React.FC<Props> = async ({ ...rest }) => {
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  const products = await payload.find({
    collection: "products",
    where: {
      active: { equals: true },
    },
  })
  const className = classNames("space-y-6 gap-2 flex flex-col items-center", rest.className)
  const inventory = user?.inventory as UserInventory | null
  return (
    <ContentWrapper
      className={className}
      backgroundClassname="bg-white"
    >
      <H2 label="Elige tu plan y accede al legado Escohotado." className='text-center' />
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
        subscription={
          Object.values(inventory?.subscriptions ?? {}).at(0)
        }
      />
    </ContentWrapper>
  );
};

