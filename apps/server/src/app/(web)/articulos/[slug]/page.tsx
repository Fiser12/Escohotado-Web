import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { NextPage } from "next/types";
import { Media, Pdf, Taxonomy } from "payload-types";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { mapAnyToComment } from 'hegel';
import { evalPermissionByRoleQuery, ContentProtected } from "payload-access-control";
import { mapTaxonomyToCategoryModel } from '@/core/mappers/mapTaxonomyToCategoryModel';
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { TypedLocale } from 'payload';
import { mapQuoteCard } from '@/core/mappers/mapCards';
import { COLLECTION_SLUG_ARTICLE_WEB } from '@/core/collectionsSlugs';
import { routes } from '@/core/routesGenerator';
import { DetailBottomSection } from '@/components/common/detail_bottom_section';
import { SEOContentWrapper } from '@/components/common/seo_content_wrapper';
import { ArticleDetail } from '@/components/content/pages/article_page/detalle_web';

export const searchContentParamsCache = createSearchParamsCache({
  locale: parseAsString.withDefault('es'),
})

interface Props {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
}

const parseLocale = (locale: string): TypedLocale => {
  if (locale === 'es') return 'es';
  if (locale === 'en') return 'en';
  return 'es';
}

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { locale } = await searchContentParamsCache.parse(searchParams)

  const payload = await getPayload();
  const [user, articles] = await Promise.all([
    getCurrentUserQuery(payload),
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_WEB,
      where: {
        slug: { equals: slug }
      },
      locale: parseLocale(locale)
    })
  ]);
  const article = articles.docs.at(0);
  // @ts-ignore
  const locales = article?.locales ?? [] as string[];
  if (!article) return null;
  const document = article.document as Pdf | null
  const downloadUrl = evalPermissionByRoleQuery(user, document?.permissions_seeds) ? document?.url : null;
  const cover = (article.cover as Media | null)?.url
  return <SEOContentWrapper
    title={article?.title ?? "No title"}
    description={""}
    imageHref={cover}
    ogType="article"
  >
    <ArticleDetail
      title={article.title ?? "No title"}
      locales={locales}
      downloadUrl={downloadUrl}
      currentLocale={locale}
      publishedAt={article.publishedAt as string}
      coverHref={(article.cover as Media | null)?.url}
      detailHref={routes.nextJS.generateDetailHref({ collection: "article_web", value: article })}
      categories={article.categories?.cast<Taxonomy>().map(mapTaxonomyToCategoryModel) ?? []}
    >
        <ContentProtected
          user={user}
          content={article}
          collection={COLLECTION_SLUG_ARTICLE_WEB}
        >
            {({ hasPermissions, isUnlocked }) => <>
              {article.content && (hasPermissions || isUnlocked) &&
                <LexicalRenderer className="max-w-[48rem] mx-auto" data={article.content!} />
              }
            </>
          }
        </ContentProtected>
      <DetailBottomSection
        quotesModel={[].mapNotNull(mapQuoteCard(user))}
        commentsSectionModel={mapAnyToComment(article.forum_post_id, article.last_forum_posts ?? [])}
      />
    </ArticleDetail>
  </SEOContentWrapper>
};

export default Page;

