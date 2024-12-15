import { Meta, StoryObj } from "@storybook/react";
import { ArticleCard } from "./article_card";

const meta: Meta = {
    title: "Molecules/Cards",
    component: ArticleCard,
    parameters: {
        layout: "centered",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=683-1637&t=ywkogyBA7q9g27hy-4",
        },
        backgrounds: {
            default: "dark",
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the article" },
        textLink: { control: "text", description: "Text for the link" },
        coverHref: { control: "text", description: "Image URL for the cover" },
        publishedAt: { control: "text", description: "Publication date" },
        hasPermission: {
            control: "boolean",
            defaultValue: true,
            description: "If the user has permission to access",
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Article Card",
    args: {
        title: "Sample Article Title",
        publishedAt: "2024-11-18",
        textLink: "Leer más",
        coverHref: "https://placehold.co/300x150",
        hasPermission: false,
        categories: [
            { id: "1", singular_name: "Tecnología" },
            { id: "2", singular_name: "Filosofía" },
        ],
    },
};
