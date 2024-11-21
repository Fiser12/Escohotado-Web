import { Meta, StoryObj } from "@storybook/react";
import { ArticleHighlight } from "./article_highlight";

const meta: Meta = {
    title: "Articles/Highlight",
    component: ArticleHighlight,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=290-2341&t=A6HujXPg3d0OyZpR-4",
        },
    },
    argTypes: {
        author: { control: "text", description: "Author of the article" },
        title: { control: "text", description: "Title of the article" },
        textLink: { control: "text", description: "Text for the link" },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Highligh: Story = {
    name: "Highlight",
    args: {
        author: "Sr. John Doe",
        title: "Sample Article Title",
        textLink: "Leer más",
    }
};