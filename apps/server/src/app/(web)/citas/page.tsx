import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, GridCardsBlock } from "gaudi/server";
import { Quote } from "payload-types";
import { getQuotesQueryByTags } from "@/core/content/getQuotesQuery";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { convertContentModelToCard, routes } from "hegel";
import { mapQuoteCard } from "@/core/domain/mapping/mapCards";
import { SearchBarNuqs } from "@/ui/nuqs/search_bar_nuqs";
import { DynamicLoadingQuotes } from '@/ui/dynamic-loading-lists/dynamic-loading-quotes';
import { TagsFilterBarSSR } from '@/ui/nuqs/tags_filter_bar_ssr';
import { evalPermissionQuery } from '@/core/auth/permissions/evalPermissionQuery';
import { redirect } from 'next/navigation';

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

  const [user, quotesResult ] = await Promise.all([
    getCurrentUserQuery(payload),
    getQuotesQueryByTags(query, tags.split(",").filter(Boolean) ?? [], 0, "publishedAt"),
  ]);
  const quoteCardMapper = (video: Quote) => mapQuoteCard(user)(video);
  const hasPermission = evalPermissionQuery(user, "basic");
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

