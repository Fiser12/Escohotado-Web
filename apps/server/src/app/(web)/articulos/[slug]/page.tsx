import { COLLECTION_SLUG_ARTICLE_WEB } from "@/core/infrastructure/payload/collections/config";
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ArticleDetail } from "gaudi/server";
import { NextPage } from "next/types";
import { Media, Taxonomy } from "payload-types";
import { RichTextRenderer } from "@/ui/lexical/RichTextRenderer";

interface Props {
  params: {
    slug: string;
  };
}

const Page: NextPage<Props> = async (props) => {
  const { slug } = await props.params;

  const payload = await getPayload();
  const [user, articles] = await Promise.all([
    getCurrentUserQuery(payload),
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_WEB,
      where: {
        slug: { equals: slug }
      }
    })
  ]);

  const article = articles.docs[0];
  article?.content
  return (
    <div>
    <ArticleDetail
      title={article.title ?? "No title"}
      href={`/articulos/${article.slug}`}
      publishedAt={article.publishedAt as string}
      coverHref={(article.cover as Media | null)?.url ?? "#"}
      textLink={"Leer más"}
      categories={article.categories as Taxonomy[]}
    >
      {article.content && 
        <RichTextRenderer className="max-w-[48rem] mx-auto" data={article.content} enableGutter={false} />
      }
    </ArticleDetail>
    </div>
  );
};

export default Page;

