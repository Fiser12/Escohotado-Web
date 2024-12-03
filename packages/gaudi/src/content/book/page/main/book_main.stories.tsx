import { Meta, StoryObj } from "@storybook/react";
import { BookMain } from ".";

const meta: Meta = {
    title: "Books/Pages/Main",
    component: BookMain,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-568&t=SR06bJEJulQ61GKV-4",
        },
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