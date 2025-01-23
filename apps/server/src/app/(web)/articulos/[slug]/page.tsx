import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ArticleDetail } from "gaudi/server";
import { NextPage } from "next/types";
import { Media, Taxonomy } from "payload-types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { COLLECTION_SLUG_ARTICLE_WEB } from '@/payload/collections/config';

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
        publishedAt={article.publishedAt as string}
        coverHref={(article.cover as Media | null)?.url ?? "#"}
        textLink={"Leer más"}
        categories={article.categories as Taxonomy[]}
        commentsSectionModel={{
          comments: [],
          forumTopicId: article.forum_post_id
        }}
      >
        {article.content &&
          <LexicalRenderer className="max-w-[48rem] mx-auto" data={article.content} />
        }
      </ArticleDetail>
    </div>
  );
};

export default Page;

