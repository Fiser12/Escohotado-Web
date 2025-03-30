import { Meta, StoryObj } from "@storybook/react";
import { ArticleDetail } from ".";
import { mockUsers } from "@/components/mockData/user.model";
import { mockArticles } from "@/components/mockData/article.model";
import { mockQuotes } from "@/components/mockData/quotes.model";

const meta: Meta<typeof ArticleDetail> = {
    title: "Pages/Articles/Detail/Web",
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
        quotes: mockQuotes,
        user: mockUsers.free
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


