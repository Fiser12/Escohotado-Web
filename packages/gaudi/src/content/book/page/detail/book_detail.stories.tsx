import { Meta, StoryObj } from "@storybook/react";
import { BookDetail } from ".";

const meta: Meta = {
    title: "Books/Pages/Detail",
    component: BookDetail,
    parameters: {
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=672-2292&t=IbC3J7bF5FGU0FcI-4",
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
    parameters: {
        layout: "fullscreen",
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    }
};