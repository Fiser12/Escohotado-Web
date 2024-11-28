import { COLLECTION_SLUG_ARTICLE_WEB } from "@/collections/config";
import { getCurrentUser, getPayload } from "@/utils/payload";
import { ContentWrapper, H2, ArticleDetail } from "gaudi";
import { NextPage } from "next/types";
import { Media, Taxonomy } from "payload-types";

interface Props {
  params: {
    slug: string;
  };
}

const Page: NextPage<Props> = async (props) => {
    const { slug } = await props.params;
  
    const payload = await getPayload();
    const [user, articles] = await Promise.all([
      getCurrentUser(payload),
      payload.find({
        collection: COLLECTION_SLUG_ARTICLE_WEB,
        where: {
          slug: { equals: slug }
        }
      })
    ]);

    const article = articles.docs[0];
    
    return (
      <ArticleDetail
        title={article.title ?? "No title"}
        href={`/articulos/${article.slug}`}
        publishedAt={article.publishedAt as string}
        coverHref={(article.cover as Media | null)?.url ?? "#"}
        textLink={"Leer más"}
        categories={article.categories as Taxonomy[]}
        contentHtml={article.content_html ?? "<p>Empty</p>"}
      />
    );
  };
  
  export default Page;
  
  