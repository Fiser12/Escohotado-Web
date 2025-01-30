import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ArticleDetailPdf, DetailBottomSection } from "gaudi/server";
import { NextPage } from "next/types";
import { Media, Quote, Taxonomy } from "payload-types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { COLLECTION_SLUG_ARTICLE_PDF } from 'hegel/payload';
import { mapAnyToComment } from 'hegel';
import { getAuthorFromTaxonomies } from '@/core/content/taxonomiesGetters';
import { evalPermissionQuery } from '@/core/auth/permissions/evalPermissionQuery';
import { generateDetailHref, mapQuoteCard } from '@/core/domain/mapping/mapCards';

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
  const hasPermissions = evalPermissionQuery(user, 'basic');
  const quotes = (articlePdf?.quotes?.docs ?? [])
    .slice(0, hasPermissions ? 3 : 0)
    .cast<Quote>()

  return <ArticleDetailPdf
    title={articlePdf.title ?? "No title"}
    href={articlePdf.url}
    author={getAuthorFromTaxonomies(articlePdf.categories as Taxonomy[])?.singular_name}
    publishedAt={articlePdf.publishedAt as string}
    detailHref={generateDetailHref({ relationTo: "article_pdf", value: articlePdf })}
    coverHref={(articlePdf.cover as Media | null)?.url ?? "#"}
    categories={articlePdf.categories as Taxonomy[]}
  >
    {articlePdf.content &&
      <LexicalRenderer className="max-w-[48rem] mx-auto" data={articlePdf.content} />
    }
    <DetailBottomSection
      quotesModel={quotes.mapNotNull(mapQuoteCard)}
      commentsSectionModel={mapAnyToComment(articlePdf.forum_post_id, articlePdf.last_forum_posts ?? [])}
    />
  </ArticleDetailPdf>
};

export default Page;

