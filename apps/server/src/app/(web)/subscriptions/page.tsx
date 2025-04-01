import { SubscriptionsSection } from "@/components/organisms/subscription/subscriptions.organism";
import { servicesProd } from "@/modules/services";

const Page = async () => {
  const user = await servicesProd.auth.getCurrentUser()
  return <SubscriptionsSection className='pt-12 pb-6' services={servicesProd} user={user}/>;
};

export default Page;

