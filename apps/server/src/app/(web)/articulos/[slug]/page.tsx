import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { NextPage } from "next/types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { COLLECTION_SLUG_ARTICLE_WEB } from '@/core/collectionsSlugs';
import { ArticleDetail } from '@/components/pages/article_page/detalle_web';
import { servicesProd } from '@/modules/services';

export const searchContentParamsCache = createSearchParamsCache({
  locale: parseAsString.withDefault('es'),
})

interface Props {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
}

const parseLocale = (locale: string): "es" | "en" => {
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
  if (!article) return null;

  return <ArticleDetail
    article={article}
    quotes={[]}
    services={servicesProd}
    user={user}
    currentLocale={locale}
  />
};

export default Page;

