import { Meta, StoryObj } from "@storybook/react";
import { Carousel } from ".";

const meta: Meta = {
    title: "Components/Containers/Carousel",
    component: Carousel,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "",
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
    args: {
        // Add default props for the story here
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    }
};