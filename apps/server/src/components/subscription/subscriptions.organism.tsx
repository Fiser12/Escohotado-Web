import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { signIn } from '@/payload/plugins/authjs/plugin';
import classNames from 'classnames';
import { UserInventory } from 'payload-access-control';
import { ContentWrapper } from '@/components/common/content_wrapper/content_wrapper';
import { Typo } from '@/components/common/typographies/Typographies';
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
      <Typo.H2 className='text-center'>Elige tu plan y accede al legado Escohotado.</Typo.H2>
      <Typo.H4 className='text-center'>Descubre videos, artículos y textos exclusivos.</Typo.H4>
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

