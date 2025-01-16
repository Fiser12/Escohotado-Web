import { Meta, StoryObj } from "@storybook/react";
import { ArticlePdf } from ".";


const meta: Meta = {
    title: "Pages/Articles/Detail/Pdf",
    component: ArticlePdf,
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
        textLink: { control: "text", description: "Text for the link" },
        coverHref: { control: "text", description: "Image URL for the cover" },
        publishedAt: { control: "text", description: "Publication date" },
        contentHtml: { control: "text", description: "HTML content of the article" },
    },
    args: {
        title: "Sample Article Title",
        author: "Sample Article Author",
        publishedAt: "2024-11-18",
        textLink: "Leer más",
        coverHref: "https://placehold.co/600x150",
        categories: [
            { id: "1", singular_name: "Tecnología" },
            { id: "2", singular_name: "Filosofía" },
        ],
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


