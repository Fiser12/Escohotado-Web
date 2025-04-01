import { getPayload } from "@/payload/utils/getPayload";
import { HomePage } from "@/components/pages/home_page";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { servicesProd } from "@/modules/services";
const Page: React.FC<{ action: string }> = async ({ action }) => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({
    slug: "home_page"
  })

  return <HomePage 
    action={action} 
    lexicalContent={homeData.content as SerializedEditorState} 
    services={servicesProd}
  />;
};

export default Page;
