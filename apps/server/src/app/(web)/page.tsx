import { getPayload } from "@/core/infrastructure/payload/utils/getPayload";
import { HomePage, Featured } from "gaudi/server";
import { ArticlePdf, ArticleWeb, Book, Media, Taxonomy, Video } from "payload-types";

const getAuthorFromTaxonomies = (taxonomies: Taxonomy[]): string => {
  return taxonomies
  .filter((taxonomy) => taxonomy.seed?.includes("autor"))
  .map((taxonomy) => taxonomy.singular_name).join(", ");
}

const mapArticlePdfCard = (item: ArticlePdf | ArticleWeb): Featured => {
  return {
    type: "article",
    id: item.id,
    title: item.title,
    author: getAuthorFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    categories: [],
    coverHref: (item.cover as Media)?.url ?? "#",
    href: "#",
    className: ""
  }
}
const mapVideoCard = (item: Video): Featured => {
  return {
    type: "video",
    id: item.id,
    title: item.title ?? "No title",
    categories: [],
    coverHref: item.thumbnailUrl ?? "#",
    href: "#",
    className: ""
  }
}
const mapBookCard = (item: Book): Featured => {
  return {
    type: "book",
    id: item.id,
    author: getAuthorFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    coverHref: (item.cover as Media)?.url ?? "#",
    href: "#",
    quote: item.description ?? "No description",
    title: item.title ?? "No title",
    className: ""
  }
}

const Page = async () => {
  const payload = await getPayload();
  const homePageData = await payload.findGlobal({
    slug: 'home_page'
  })
  
  const mapCards = (cards: typeof homePageData.cards): Featured[] => {
    return cards?.map((card) => {
      switch (card.relationTo) {
        case "article_web":
        case "article_pdf":
          return mapArticlePdfCard(card.value as ArticlePdf | ArticleWeb);
        case "video":
          return mapVideoCard(card.value as Video);
        case "book":
          return mapBookCard(card.value as Book);
    }}) ?? []
  }
  return (
    <HomePage
      buttons={[]}
      description={homePageData.hero?.description ?? "No description"}
      featuredItems={mapCards(homePageData.cards)}
    />
  );
};

export default Page;
