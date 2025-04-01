import { HomePage } from "@/components/pages/home_page";
import { servicesProd } from "@/modules/services";
import { getPayload } from "@/payload/utils/get-payload";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
const Page: React.FC<{ action: string }> = async ({ action }) => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({ slug: "home_page" })

  return <HomePage
    action={action}
    lexicalContent={homeData.content as SerializedEditorState}
    services={servicesProd}
  />;
};

export default Page;
