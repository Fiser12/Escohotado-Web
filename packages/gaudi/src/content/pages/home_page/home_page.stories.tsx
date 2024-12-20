import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from ".";

const meta: Meta = {
        title: "Pages/Home",
        component: HomePage,
        parameters: {
                layout: "fullscreen",
                design: {
                        type: "figspec",
                        url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=283-707&t=acmeOqADvcdhZQZx-4"
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