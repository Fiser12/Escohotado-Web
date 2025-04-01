import { QuotesPageList } from '@/components/pages/quotes_page';
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { getQuotesQueryWithCache } from "@/core/queries/get-quotes-query";
import { tagsFromContentQueryWithCache } from '@/core/queries/tags-from-content-query';
import { routes } from '@/core/routes-generator';
import { servicesProd } from '@/modules/services';
import { getPayload } from '@/payload/utils/get-payload';
import { generateFilterExpresionFromTags } from "hegel";
import { redirect } from 'next/navigation';
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { evalPermissionByRoleQuery } from "payload-access-control";
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

