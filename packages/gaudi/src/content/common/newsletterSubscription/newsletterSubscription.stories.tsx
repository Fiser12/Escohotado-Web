import {Meta, StoryObj} from "@storybook/react";
import {NewsletterSubscription} from ".";

const meta: Meta = {
    title: "Organism/Newsletter Subscription",
    component: NewsletterSubscription,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=283-731&t=AxV99ntgTWcOMvSI-4",
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