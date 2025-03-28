import HomePage from "@/app/(web)/page";
import { routes } from "@/core/routesGenerator";
import { SearchModalLayout } from "@/modules/modal-layouts/SearchModalLayout";

const Page = async () => {
  return <>
    <HomePage
      action={routes.newsletter.newsletterSubscriptionForm}
    />
    <SearchModalLayout 
      goBackTo={routes.nextJS.homePageHref}
    />
  </>
};

export default Page;

