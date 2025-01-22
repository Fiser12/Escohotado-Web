import { getPayload } from "@/payload/utils/getPayload";
import { RichTextRenderer } from "@/lexical/RichTextRenderer";

const Page = async () => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({
    slug: "home_page"
  })

  return (
    <>
      {homeData.content &&
        <RichTextRenderer
          data={homeData.content}
          className="h-full"
        />
      }
    </>
  );
};

export default Page;
