import { getPayload } from "@/payload/utils/getPayload";
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { HomePage } from "@/components/pages/home_page";

const Page: React.FC<{ action: string }> = async ({ action }) => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({
    slug: "home_page"
  })
  const user = await getCurrentUserQuery(payload);

  return <HomePage 
    user={user} 
    action={action} 
    lexicalContent={homeData.content} 
  />;
};

export default Page;
