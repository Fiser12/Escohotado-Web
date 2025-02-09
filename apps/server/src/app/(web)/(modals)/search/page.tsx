import { routes } from "hegel";
import HomePage from "@/app/(web)/page";
import { SearchModalLayout } from "@/ui/modal-layouts/SearchModalLayout";

const Page = async () => {
  return <>
    <HomePage/>
    <SearchModalLayout 
      goBackTo={routes.nextJS.homePageHref}
    />
  </>
};

export default Page;

