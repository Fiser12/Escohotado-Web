import { mockVideos } from '@/core/mock-data/video.model';
import { VideosQueryResult } from '@/core/queries/get-videos-query';
import { ServicesMockBuilder } from '@/modules/services-mock-builder';
import type { Meta, StoryObj } from '@storybook/react';
import { VideoPageList } from './index';

const randomVideos = mockVideos.sort(() => Math.random() - 0.5);

const mockVideosResult: VideosQueryResult = {
    results: randomVideos.map((video) => ({ ...video, allowedHref: null })),
    maxPage: 5,
}
const mockLastVideosResult: VideosQueryResult = {
    results: randomVideos
        .slice(0, 3)
        .map((video) => ({ ...video, allowedHref: null })),
    maxPage: 5,
}

const meta: Meta<typeof VideoPageList> = {
    title: 'Pages/Lists/VideoPageList',
    component: VideoPageList,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-white">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof VideoPageList>;

export const Default: Story = {
    args: {
        user: null,
        videosDataPage: {} as any,
        videosResult: mockVideosResult,
        lastVideosResult: mockLastVideosResult,
        sort: 'popularity',
        query: '',
        playlist: '',
        services: ServicesMockBuilder({
            children: <div>Mock</div>,
            listVideos: randomVideos.sort(() => Math.random() - 0.5)
        })
    },
};
