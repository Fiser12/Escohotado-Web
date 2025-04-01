import { mockUsers } from '@/core/mockData';
import { mockArticles } from '@/core/mockData/article.model';
import { mockBooks } from '@/core/mockData/book.model';
import { ArticlesQueryResult } from '@/core/queries/getArticlesQuery';
import { ServicesMockBuilder } from '@/modules/services-mock-builder';
import type { Meta, StoryObj } from '@storybook/react';
import { CategoryModel } from 'hegel';
import { ArticlePageList } from './index';

const randomArticles = mockArticles.sort(() => Math.random() - 0.5);

const mockArticlesResult: ArticlesQueryResult = {
    results: randomArticles,
    maxPage: 5,
}

const mockLastArticles = randomArticles.slice(0, 5);

const mockTaxonomies: CategoryModel[] = [
    { id: 1, slug: 'filosofia', label: 'Filosofía' },
    { id: 2, slug: 'libertad', label: 'Libertad' },
    { id: 3, slug: 'religion', label: 'Religión' },
    { id: 4, slug: 'homenaje', label: 'Homenajes' },
    { id: 5, slug: 'veneno', label: 'Venenos' }
];

const meta: Meta<typeof ArticlePageList> = {
    title: 'Pages/Lists/ArticlePageList',
    component: ArticlePageList,
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

type Story = StoryObj<typeof ArticlePageList>;

export const Default: Story = {
    args: {
        user: null,
        articlesDataPage: {} as any,
        articlesResult: mockArticlesResult,
        lastArticles: mockLastArticles,
        books: mockBooks,
        taxonomies: mockTaxonomies,
        query: '',
        services: ServicesMockBuilder({ children: <div>Mock</div> }),
        tags: []
    },
};
