import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";

const Page = async () => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({
    slug: "home_page"
  })

  return (
    <>
      {homeData.content &&
        <LexicalRenderer
          data={homeData.content}
          className="h-full"
        />
      }
    </>
  );
};

export default Page;
