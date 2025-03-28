import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { Quote } from "payload-types";
import { getQuotesQueryWithCache } from "@/core/queries/getQuotesQuery";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { convertContentModelToCard, generateFilterExpresionFromTags } from "hegel";
import { mapQuoteCard } from "@/core/mappers/mapCards";
import { evalPermissionByRoleQuery } from "payload-access-control";
import { redirect } from 'next/navigation';
import { DynamicLoadingQuotes } from '@/modules/dynamic-loading-lists/dynamic-loading-quotes';
import { SearchBarNuqs } from "@/modules/nuqs/search_bar_nuqs";
import { TagsFilterBarSSR } from '@/modules/nuqs/tags_filter_bar_ssr';
import { routes } from '@/core/routesGenerator';
import { ContentWrapper } from '@/components/common/content_wrapper/content_wrapper';
import { H2 } from '@/components/common/headers/H2';
import { GridCardsBlock } from '@/components/content/featured_grid_home/GridCardsBlock';

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

  const [user, quotesResult] = await Promise.all([
    getCurrentUserQuery(payload),
    getQuotesQueryWithCache(0, 20, "publishedAt", query, null, tags.split(",").filter(Boolean).length > 0 ? generateFilterExpresionFromTags(tags.split(",").filter(Boolean), '&&') : null),
  ]);
  const quoteCardMapper = (video: Quote) => mapQuoteCard(user)(video);
  const hasPermission = evalPermissionByRoleQuery(user, "basic");
  if (!hasPermission) return redirect(routes.nextJS.subscriptionPageHref);

  return (
    <ContentWrapper
      className="flex flex-col gap-y-5 pt-12.5"
      backgroundClassname="bg-white"
    >
      <div className="flex flex-col sm:flex-row gap-10 items-end justify-between w-full">
        <H2 label="Todas las citas" className='w-full' />
        <div className='flex flex-row-reverse gap-3 w-full'>
          <SearchBarNuqs />
          <TagsFilterBarSSR
            collection={['quote']}
            query={query}
            excludeSeeds={[]}
            title='Etiquetas'
            queryKey='tags'
          />
        </div>
      </div>
      <GridCardsBlock
        features={quotesResult.results
          .map(quoteCardMapper)
          .map(item => convertContentModelToCard("col-span-3")(item))}
        className='grid-cols-3 md:grid-cols-6 lg:grid-cols-12'
      />
      <DynamicLoadingQuotes
        user={user}
        sortedBy={"publishedAt"}
        tags={tags.split(",").filter(Boolean) ?? []}
        query={query}
        maxPage={quotesResult.maxPage}
      />
    </ContentWrapper>
  );
};

export default Page;

