import { Meta, StoryObj } from "@storybook/react";
import { VideoDetail } from ".";

const meta: Meta<typeof VideoDetail> = {
    title: "Pages/Videos/Detail",
    component: VideoDetail,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=683-1637&t=ywkogyBA7q9g27hy-4",
        },
        backgrounds: {
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the article" },
        author: { control: "text", description: "Author of the article" },
        publishedAt: { control: "text", description: "Publication date" },
    },
    args: {
        title: "Sample Article Title",
        author: "Sample Article Author",
        publishedAt: "2024-11-18",
        duration: 0,
        videoHref: "https://www.youtube.com/watch?v=mV-4JUWcAC4",
        categories: [
            { id: 1, label: "Tecnología" },
            { id: 2, label: "Filosofía" },
        ]
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
    },
};


