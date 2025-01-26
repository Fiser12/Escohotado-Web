import { Meta, StoryObj } from "@storybook/react";
import { HeadlineCard } from "./article_headline_card";

const meta: Meta<typeof HeadlineCard> = {
    title: "Molecules",
    component: HeadlineCard,
    parameters: {
        layout: "padded",
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

export const Default: Story = {
    name: "Headline",
    args: {
        author: "Sr. John Doe",
        title: "Sample Article Title",
        textLink: "Leer más",
    }
};