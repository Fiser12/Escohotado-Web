import { Meta, StoryObj } from "@storybook/react";
import { SocialMediaShare } from ".";

const meta: Meta = {
    title: "Molecules",
    component: SocialMediaShare,
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

export const SocialMedia: Story = {};