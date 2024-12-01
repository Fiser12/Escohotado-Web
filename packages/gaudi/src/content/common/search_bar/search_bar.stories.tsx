import { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '.';

const meta: Meta<typeof SearchBar> = {
    title: "Atoms/Inputs",
    component: SearchBar,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=420-1227&t=T6gQySPAwetTNvaR-4",
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchBarComp: Story = {
    name: "Search Bar",
};

