import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ArticleDetail, DetailBottomSection } from "gaudi/server";
import { NextPage } from "next/types";
import { Media, Quote, Taxonomy } from "payload-types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { COLLECTION_SLUG_ARTICLE_WEB, routes } from 'hegel/payload';
import { mapAnyToComment } from 'hegel';
import { evalPermissionQuery } from '@/core/auth/permissions/evalPermissionQuery';
import { mapQuoteCard } from '@/core/domain/mapping/mapCards';
import { mapTaxonomyToCategoryModel } from '@/core/domain/mapping/mapTaxonomyToCategoryModel';
import { ContentProtected } from '@/ui/contentProtected';
import { FreemiumHighlightSection } from 'gaudi/client';

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

  const hasPermissions = evalPermissionQuery(user, 'basic');
  const quotes = (article?.quotes?.docs ?? [])
    .slice(0, hasPermissions ? 3 : 0)
    .cast<Quote>()

  return <ArticleDetail
    title={article.title ?? "No title"}
    publishedAt={article.publishedAt as string}
    coverHref={(article.cover as Media | null)?.url ?? "#"}
    detailHref={routes.nextJS.generateDetailHref({ collection: "article_web", value: article })}
    categories={article.categories?.cast<Taxonomy>().map(mapTaxonomyToCategoryModel) ?? []}
  >
    {article.content &&
      <ContentProtected fallback={<FreemiumHighlightSection />} >
        <LexicalRenderer className="max-w-[48rem] mx-auto" data={article.content} />
      </ContentProtected>
    }
    <DetailBottomSection
      quotesModel={quotes.mapNotNull(mapQuoteCard(user))}
      commentsSectionModel={mapAnyToComment(article.forum_post_id, article.last_forum_posts ?? [])}
    />
  </ArticleDetail>
};

export default Page;

