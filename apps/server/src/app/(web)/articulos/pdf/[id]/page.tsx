import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ArticleDetailPdf } from "gaudi/server";
import { NextPage } from "next/types";
import { Media, Taxonomy } from "payload-types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { COLLECTION_SLUG_ARTICLE_PDF } from '@/payload/collections/config';
import { mapAnyToComment } from 'hegel';

interface Props {
  params: {
    id: string;
  };
}

const Page: NextPage<Props> = async (props) => {
  const { id } = await props.params;

  const payload = await getPayload();
  const [user, articlePdf] = await Promise.all([
    getCurrentUserQuery(payload),
    payload.findByID({
      collection: COLLECTION_SLUG_ARTICLE_PDF,
      id
    })
  ]);

  return <ArticleDetailPdf
    title={articlePdf.title ?? "No title"}
    href={articlePdf.url}
    publishedAt={articlePdf.publishedAt as string}
    coverHref={(articlePdf.cover as Media | null)?.url ?? "#"}
    categories={articlePdf.categories as Taxonomy[]}
    commentsSectionModel={mapAnyToComment(articlePdf.forum_post_id, articlePdf.last_forum_posts ?? [])}
  >
    {articlePdf.content &&
      <LexicalRenderer className="max-w-[48rem] mx-auto" data={articlePdf.content} />
    }
  </ArticleDetailPdf>

};

export default Page;

