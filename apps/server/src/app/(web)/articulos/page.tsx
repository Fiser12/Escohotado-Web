import { COLLECTION_SLUG_ARTICLE_PDF } from "@/collections/config";
import { getCurrentUser, getPayload } from "@/utils/payload";
import { ContentWrapper, H2, ArticleCard } from "gaudi";
import { ArticlePdf, Media, Taxonomy } from "payload-types";

const Page = async () => {
  const payload = await getPayload();
  const user = await getCurrentUser(payload);
  const articles = await payload.find({
    collection: COLLECTION_SLUG_ARTICLE_PDF,
    sort: ""
  })

  return (
    <ContentWrapper
      className="space-y-6 gap-2 flex flex-col items-center pt-16"
      backgroundClassname="bg-white"
    >
      <H2 label="Artículos" />
      <div>
        {articles.docs.map((article: ArticlePdf, index) => (
          <ArticleCard
            key={index}
            title={article.title ?? "No title"}
            href={article.url ?? "#"}
            publishedAt={article.publishedAt as string}
            coverHref={(article.cover as Media | null)?.url ?? "#"}
            textLink="Descargar"
            categories={article.categories as Taxonomy[]}
            hasPermission={true}
          />
        ))}
      </div>

    </ContentWrapper>
  );
};

export default Page;

