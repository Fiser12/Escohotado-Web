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
import { FreemiumHighlightSection, SEOContentWrapper } from 'gaudi/client';

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
  const hasBasicPermission = evalPermissionQuery(user, 'basic');
  const quotes = (article?.quotes?.docs ?? [])
    .slice(0, hasBasicPermission ? 3 : 0)
    .cast<Quote>()
  const cover = (article.cover as Media | null)?.url
  return <SEOContentWrapper
    title={article?.title ?? "No title"}
    description={""}
    imageHref={cover}
    ogType="article"
  >
    <ArticleDetail
      title={article.title ?? "No title"}
      publishedAt={article.publishedAt as string}
      coverHref={(article.cover as Media | null)?.url}
      detailHref={routes.nextJS.generateDetailHref({ collection: "article_web", value: article })}
      categories={article.categories?.cast<Taxonomy>().map(mapTaxonomyToCategoryModel) ?? []}
    >
      {article.content &&
        <ContentProtected 
          fallback={<BlockedContentArea content={article.preview_content} />} 
          permissions_seeds={article.permissions_seeds}
        >
          <LexicalRenderer className="max-w-[48rem] mx-auto" data={article.content} />
        </ContentProtected>
      }
      <DetailBottomSection
        quotesModel={quotes.mapNotNull(mapQuoteCard(user))}
        commentsSectionModel={mapAnyToComment(article.forum_post_id, article.last_forum_posts ?? [])}
      />
    </ArticleDetail>
  </SEOContentWrapper>
};

const BlockedContentArea: React.FC<{ content: any }> = ({ content }) => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full overflow-hidden">
        <div className="relative">
          <LexicalRenderer className="max-w-[48rem] mx-auto" data={content} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      </div>
      <FreemiumHighlightSection />
    </div>
  );
};

export default Page;

