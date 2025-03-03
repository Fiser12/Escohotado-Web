import { Meta, StoryObj } from "@storybook/react";
import { ArticleDetailPdf } from ".";

const meta: Meta<typeof ArticleDetailPdf> = {
    title: "Pages/Articles/Detail/Pdf",
    component: ArticleDetailPdf,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: "figspec",
            url: "",
        },
        backgrounds: {
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the article" },
        author: { control: "text", description: "Author of the article" },
        coverHref: { control: "text", description: "Image URL for the cover" },
        publishedAt: { control: "text", description: "Publication date" },
    },
    args: {
        title: "Sample Article Title",
        author: "Sample Article Author",
        publishedAt: "2024-11-18",
        coverHref: "https://placehold.co/600x150",
        categories: [
            { id: 1, label: "Tecnología" },
            { id: 2, label: "Filosofía" },
        ]
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


