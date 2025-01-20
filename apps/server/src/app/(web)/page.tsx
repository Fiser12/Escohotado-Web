import { getPayload } from "@/core/infrastructure/payload/utils/getPayload";
import { HomePage } from "gaudi/server";
import { mapCards } from "../../core/domain/mapping/mapCards";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";

const Page = async () => {
  const payload = await getPayload();
  const homePageData = await payload.findGlobal({
    slug: 'home_page',
    depth: 3
  })
  const user = await getCurrentUserQuery(payload);
  
  const gridItems = (homePageData.cards ?? []).map(mapCards(user))

  return (
    <HomePage
      buttons={homePageData.hero?.buttons ?? []}
      description={homePageData.hero?.description ?? "No description"}
      featuredItems={gridItems}
    />
  );
};

export default Page;
