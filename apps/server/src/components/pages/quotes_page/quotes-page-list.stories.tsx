import { mockQuotes } from '@/core/mock-data/quotes.model';
import { QuotesQueryResult } from '@/core/queries/get-quotes-query';
import { ServicesMockBuilder } from '@/modules/services-mock-builder';
import type { Meta, StoryObj } from '@storybook/react';
import { CategoryModel } from 'hegel';
import { QuotesPageList } from './index';

const randomQuotes = mockQuotes.sort(() => Math.random() - 0.5);

const mockQuotesResult: QuotesQueryResult = {
    results: randomQuotes,
    maxPage: 5,
}

const mockTaxonomies: CategoryModel[] = [
    { id: 1, slug: 'filosofia', label: 'Filosofía' },
    { id: 2, slug: 'libertad', label: 'Libertad' },
    { id: 3, slug: 'religion', label: 'Religión' },
    { id: 4, slug: 'homenaje', label: 'Homenajes' },
    { id: 5, slug: 'veneno', label: 'Venenos' }
];

const meta: Meta<typeof QuotesPageList> = {
    title: 'Pages/Lists/QuotesPageList',
    component: QuotesPageList,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=672-2292&t=IbC3J7bF5FGU0FcI-4",
        },
    },
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-white">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof QuotesPageList>;

export const Default: Story = {
    args: {
        user: null,
        quotesResult: mockQuotesResult,
        taxonomies: mockTaxonomies,
        query: '',
        services: ServicesMockBuilder({ children: <div>Mock</div> }),
        tags: []
    },
};
