import { Meta, StoryObj } from "@storybook/react";
import { BookDetail } from ".";
import { SelectBoxes } from "../../../common/selectors/grid_select_boxes";
import { MainButton } from "../../../../common/main_button/main_button";
import { useState } from "react";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { mockBooks } from "@/components/mockData/book.model";
import { mockQuotes } from "@/components/mockData/quotes.model";

const options = [
    { id: '1', label: 'eBook', },
    { id: '2', label: 'Tapa blanda', },
]


const meta: Meta<typeof BookDetail> = {
    title: "Pages/Book/Detail",
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
        quotes: mockQuotes
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