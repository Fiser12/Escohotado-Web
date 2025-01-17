import { getPayload } from "@/core/infrastructure/payload/utils/getPayload";
import { Featured, HomePage } from "gaudi/server";
import { ArticlePdf, ArticleWeb, Book, Media, Taxonomy, Video } from "payload-types";

const getAuthorFromTaxonomies = (taxonomies: Taxonomy[]): string => {
  return taxonomies
  .filter((taxonomy) => taxonomy.seed?.includes("autor"))
  .map((taxonomy) => taxonomy.singular_name).join(", ");
}

const mapArticlePdfCard = (item: ArticlePdf | ArticleWeb, classNames?: string | null): Featured => {
  return {
    type: "article",
    id: item.id,
    title: item.title,
    author: getAuthorFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    categories: [],
    coverHref: (item.cover as Media)?.url ?? "#",
    href: "#",
    className: classNames ?? "col-span-1 md:col-span-2 lg:col-span-3"
  }
}
const mapVideoCard = (item: Video, classNames?: string | null): Featured => {
  return {
    type: "video",
    id: item.id,
    title: item.title ?? "No title",
    categories: [],
    coverHref: item.thumbnailUrl ?? "#",
    href: "#",
    className: classNames ?? "col-span-1 md:col-span-2"
  }
}
const mapBookCard = (item: Book, classNames?: string | null): Featured => {
  return {
    type: "book",
    id: item.id,
    author: getAuthorFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    coverHref: (item.cover as Media)?.url ?? "#",
    href: "#",
    quote: item.description ?? "No description",
    title: item.title ?? "No title",
    className: classNames ?? "col-span-1 md:col-span-2"
  }
}

const Page = async () => {
  const payload = await getPayload();
  const homePageData = await payload.findGlobal({
    slug: 'home_page'
  })
  
  const mapCards = (cards: typeof homePageData.cards): Featured[] => {
    return cards?.map((card) => {
      switch (card.value?.relationTo) {
        case "article_web":
        case "article_pdf":
          return mapArticlePdfCard(card.value?.value as ArticlePdf | ArticleWeb, card.tailwindClassNames);
        case "video":
          return mapVideoCard(card.value?.value as Video, card.tailwindClassNames);
        case "book":
          return mapBookCard(card.value?.value as Book, card.tailwindClassNames);
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
