import { getPayload } from "@/payload/utils/getPayload";
import { RichTextRenderer } from "@/ui/lexical/RichTextRenderer";

const Page = async () => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({
    slug: "home_page"
  })

  return (
    <RichTextRenderer 
      data={homeData.content}
      enableGutter={false} 
      className="h-full"
    />
  );
};

export default Page;
