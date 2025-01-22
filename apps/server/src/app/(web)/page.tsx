import { HomePage } from "gaudi/server";
import { getPayload } from "@/payload/utils/getPayload";

const Page = async () => {
  const payload = await getPayload();
  
  return (
    <HomePage
      buttons={[]}
      description={"No description"}
      featuredItems={[]}
    />
  );
};

export default Page;
