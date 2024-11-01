import { getPayload } from "@/utils/payload";
import { ContentWrapper, H2, H4, SubscriptionsGroupCard } from "gaudi";
import { IntervalOptions } from "hegel";
import { SubscriptionButtonActionType } from "node_modules/gaudi/src/subscription/subscriptions_card_group";

const Page = async () => {
  const payload = await getPayload();
  const products = await payload.find({
    collection: "products",
    where: {
      active: { equals: true },
    },
  })
	const options: IntervalOptions[] = [
		{ id: 'month', label: 'Pago mensual' },
		{ id: 'year', label: 'Pago anual', sublabel: 'ahorra 10%' }
	];

  return (
    <ContentWrapper
        className="space-y-6 gap-2 flex flex-col items-center pt-16"
        backgroundClassname="bg-white"
    >
        <H2 label="Elige tu plan y accede al legado Escohotado."/>
        <H4 label="Descubre videos, artículos y textos exclusivos."/>
        <p className="text-center text-cyan-950 text-base font-normal font-['Montserrat'] leading-normal">
            También puedes elegir la modalidad de pago que mejor se adapte a ti.
        </p>
        <SubscriptionsGroupCard
            products={products.docs}
            options={options}
            action={subscriptionButtonAction}
        />
            
    </ContentWrapper>
  );
};

export default Page;

const subscriptionButtonAction: (action: SubscriptionButtonActionType) => Promise<void> = async (action) => {
  'use server';
  if(action === 'cancel') {

  } else if(action === 'renew') {

  } else if(action === 'change') {
  
  } else if(action === 'select') {
  
  }
}