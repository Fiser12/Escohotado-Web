import { mockBooks } from "@/core/mock-data/book.model";
import { Meta, StoryObj } from "@storybook/react";
import { CarouselBook } from ".";


const meta: Meta<typeof CarouselBook> = {
    title: "Organism/Carousel/Book",
    component: CarouselBook,
    args: {
        books: mockBooks,
    },
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: ""
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
    parameters: {
        layout: "fullscreen",
    },
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    }
};