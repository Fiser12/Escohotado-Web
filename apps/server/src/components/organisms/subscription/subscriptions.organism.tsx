import { Typo } from '@/components/atoms/typographies/Typographies';
import { ContentWrapper } from '@/components/layout/content_wrapper/content_wrapper';
import { ServiceInjector } from '@/modules/services';
import { signIn } from '@/payload/plugins/authjs/plugin';
import classNames from 'classnames';
import { BaseUser, UserInventory } from 'payload-access-control';
import { SubscriptionsGroupCard } from './subscriptions_card_group';

interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
  user?: BaseUser | null
}

export const SubscriptionsSection: React.FC<Props> = async ({ services, user, ...rest }) => {
  const products = await services.products.getActiveProducts();
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
        products={products}
        subscription={
          Object.values(inventory?.subscriptions ?? {}).at(0)
        }
      />
    </ContentWrapper>
  );
};

