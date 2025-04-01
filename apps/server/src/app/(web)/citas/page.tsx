import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { Quote } from "payload-types";
import { getQuotesQueryWithCache } from "@/core/queries/getQuotesQuery";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { arrayToRecord, convertContentModelToCard, generateFilterExpresionFromTags } from "hegel";
import { mapQuoteCard } from '@/core/mappers/mapQuoteCard';
import { evalPermissionByRoleQuery } from "payload-access-control";
import { redirect } from 'next/navigation';
import { DynamicLoadingQuotes } from '@/modules/dynamic-loading-lists/dynamic-loading-quotes';
import { QuotesFilterBar } from "@/modules/nuqs";
import { routes } from '@/core/routesGenerator';
import { ContentWrapper } from '@/components/layout/content_wrapper/content_wrapper';
import { Typo } from '@/components/atoms/typographies/Typographies';
import { GridCards } from "@/components/organisms/lexical/grid_cards/GridCards";
import { tagsFromContentQueryWithCache } from '@/core/queries/tagsFromContentQuery';
import { servicesProd } from '@/modules/services';
import { QuotesPageList } from '@/components/pages/quotes_page';
export const searchContentParamsCache = createSearchParamsCache({
  query: parseAsString.withDefault(''),
  tags: parseAsString.withDefault(''),
})

interface Props {
  searchParams: Record<string, string>;
}


const Page = async ({ searchParams }: Props) => {
  const payload = await getPayload();
  const { query, tags } = await searchContentParamsCache.parse(searchParams)

  const [
    user, 
    quotesResult
  ] = await Promise.all([
    getCurrentUserQuery(payload),
    getQuotesQueryWithCache(0, 20, "publishedAt", query, null, tags.split(",").filter(Boolean).length > 0 ? generateFilterExpresionFromTags(tags.split(",").filter(Boolean), '&&') : null),
  ]);
  const hasPermission = evalPermissionByRoleQuery(user, "basic");
  if (!hasPermission) return redirect(routes.nextJS.subscriptionPageHref);
  const taxonomies = await tagsFromContentQueryWithCache(
    "quote", query, []
  );
  
  return <QuotesPageList
    user={user}
    quotesResult={quotesResult}
    taxonomies={taxonomies}
    query={query}
    services={servicesProd}
    tags={tags.split(",").filter(Boolean)}

  />;
};

export default Page;

