import { SearchModalLayout } from "@/ui/nuqs/global_search/global_search_nuqs";
import HomePage from "@/app/(web)/page";
const Page = async () => {
  return <>
    <HomePage/>
    <SearchModalLayout goBackTo="/"/>
  </>
};

export default Page;

