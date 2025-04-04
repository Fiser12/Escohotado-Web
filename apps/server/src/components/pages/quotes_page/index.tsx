import { Typo } from '@/components/atoms/typographies';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { GridCards } from "@/components/organisms/lexical/grid_cards";
import { mapQuoteCard } from "@/core/mappers/map-quote-card";
import { QuotesQueryResult } from "@/core/queries/get-quotes-query";
import { DynamicLoadingQuotes } from "@/modules/dynamic-loading-lists/dynamic-loading-quotes";
import { QuotesFilterBar } from '@/modules/nuqs';
import { Services } from '@/modules/services';
import { arrayToRecord, CategoryModel, convertContentModelToCard } from "hegel";
import { BaseUser } from "payload-access-control";
import { Quote } from "payload-types";

interface Props {
    user: BaseUser | null;
    quotesResult: QuotesQueryResult;
    taxonomies: CategoryModel[];
    query: string;
    services: Services;
    tags: string[];
}

export const QuotesPageList = ({
    user,
    quotesResult,
    query,
    taxonomies,
    services,
    tags,
}: Props) => {
    const quoteCardMapper = (quote: Quote) => mapQuoteCard(user)(quote);

    return <ContentWrapper
        className="flex flex-col gap-y-5 pt-12.5"
        backgroundClassname="bg-white"
    >
        <div className="flex flex-col sm:flex-row gap-10 items-end justify-between w-full">
            <Typo.H2 className='w-full'>Todas las citas</Typo.H2>
            <QuotesFilterBar listOfTags={arrayToRecord(taxonomies, "slug")} />
        </div>
        <GridCards
            features={quotesResult.results
                .map(quoteCardMapper)
                .map(item => convertContentModelToCard("col-span-3")(item))}
            className='grid-cols-3 md:grid-cols-6 lg:grid-cols-12'
        />
        <DynamicLoadingQuotes
            user={user}
            contentServices={services.content}
            sortedBy={"publishedAt"}
            tags={tags}
            query={query}
            maxPage={quotesResult.maxPage}
        />
    </ContentWrapper>
};
