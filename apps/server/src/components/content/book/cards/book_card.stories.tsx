import { Meta, StoryObj } from "@storybook/react";
import { BookCard } from ".";

const meta: Meta<typeof BookCard> = {
    title: "Molecules/Cards",
    component: BookCard,
    parameters: {
        layout: "centered",
        design: {
            type: "figspec",
            url:"https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-1341&t=nIxZZzHQV1ZdmEXC-4",
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the book" },
        coverHref: { control: "text", description: "Image URL for the book" },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Book: Story = {
    name: "Book Card",
    args: {
        title: "Sample Book Title",
        link: "#",
        coverHref: "https://placehold.co/200x307",
    },
};