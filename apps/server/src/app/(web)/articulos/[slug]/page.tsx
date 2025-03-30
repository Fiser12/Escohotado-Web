import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { NextPage } from "next/types";
import { LexicalRenderer } from "@/modules/lexical/lexicalRenderer";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { TypedLocale } from 'payload';
import { COLLECTION_SLUG_ARTICLE_WEB } from '@/core/collectionsSlugs';
import { ArticleDetail } from '@/components/content/pages/article_page/detalle_web';
import { ContentProtected } from 'payload-access-control';

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
  if (!article) return null;

  return <ArticleDetail
      article={article}
      quotes={[]}
      user={user}
      currentLocale={locale}
    >
      <ContentProtected
        user={user}
        content={article}
        collection={COLLECTION_SLUG_ARTICLE_WEB}
      >
        {({ hasPermissions, isUnlocked }) => <>
          {article.content && (hasPermissions || isUnlocked) &&
            <LexicalRenderer className="max-w-[48rem] mx-auto" data={article.content} />
          }
        </>
        }
      </ContentProtected>
    </ArticleDetail>
};

export default Page;

