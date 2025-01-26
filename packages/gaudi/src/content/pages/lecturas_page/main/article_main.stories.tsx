import { Meta, StoryObj } from "@storybook/react";
import { ArticlePage } from ".";

const meta: Meta<typeof ArticlePage> = {
    title:"Pages/Lecturas/Main",
    component: ArticlePage,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=290-796&t=3gc5bSOiadLfboYX-4",
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