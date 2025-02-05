import { SearchModalLayout } from "@/ui/dynamic-loading-lists/dynamic-global-search";
import HomePage from "@/app/(web)/page";
const Page = async () => {
  return <>
    <HomePage/>
    <SearchModalLayout goBackTo="/"/>
  </>
};

export default Page;

