import { mockQuotes } from "@/core/mock-data/quotes.model";
import { mockUsers } from "@/core/mock-data/user.model";
import { mockVideos } from "@/core/mock-data/video.model";
import { Meta, StoryObj } from "@storybook/react";
import { VideoDetail } from ".";

const meta: Meta<typeof VideoDetail> = {
    title: "Pages/Detail/Video",
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
    },
    args: {
        video: mockVideos[0],
        quotes: mockQuotes
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
    args: {
        user: mockUsers.free
    },
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};


