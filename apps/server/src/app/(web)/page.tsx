import { getPayload } from "@/core/infrastructure/payload/utils/getPayload";
import { HomePage } from "gaudi/server";
import { GridCardsBlock, UiGridCard } from "payload-types";
import { mapCards } from "../../core/domain/mapping/mapCards";

const Page = async () => {
  const payload = await getPayload();
  const homePageData = await payload.findGlobal({
    slug: 'home_page',
    depth: 3
  })
  const gridItems = (homePageData.cards ?? []).map(mapCards)

  return (
    <HomePage
      buttons={homePageData.hero?.buttons ?? []}
      description={homePageData.hero?.description ?? "No description"}
      featuredItems={gridItems}
    />
  );
};

export default Page;
