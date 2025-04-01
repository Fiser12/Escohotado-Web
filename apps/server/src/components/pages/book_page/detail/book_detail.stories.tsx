import { Meta, StoryObj } from "@storybook/react";
import { BookDetail } from ".";
import { mockBooks } from "@/core/mockData/book.model";
import { mockQuotes } from "@/core/mockData/quotes.model";
import { ServicesMockBuilder } from "@/modules/services";

const meta: Meta<typeof BookDetail> = {
    title: "Pages/Detail/Book",
    component: BookDetail,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=672-2292&t=IbC3J7bF5FGU0FcI-4",
        },
    },
    args: {
        title: "Rameras y Esposas",
        book: mockBooks[0],
        quotes: mockQuotes,
        services: ServicesMockBuilder({children: <div>Mock</div>}),
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
    }
};