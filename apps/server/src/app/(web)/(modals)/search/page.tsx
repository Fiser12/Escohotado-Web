import HomePage from "@/app/(web)/page";
import { routes } from "@/core/routesGenerator";
import { SearchModalLayout } from "@/components/organisms/modals/search_modal_layout/SearchModalLayout";

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

