import { mockArticles } from "@/core/mockData/article.model";
import { mockQuotes } from "@/core/mockData/quotes.model";
import { mockUsers } from "@/core/mockData/user.model";
import { ServicesMockBuilder } from '@/modules/services-mock-builder';
import { Meta, StoryObj } from "@storybook/react";
import { ArticleDetail } from ".";

const meta: Meta<typeof ArticleDetail> = {
    title: "Pages/Detail/Article",
    component: ArticleDetail,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=683-1637&t=ywkogyBA7q9g27hy-4",
        },
        backgrounds: {
        },
    },
    argTypes: {
    },
    args: {
        article: mockArticles[0],
        lang: "es",
        quotes: mockQuotes,
        user: mockUsers.free,
        services: ServicesMockBuilder({ children: <div>Mock</div> }),
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};


