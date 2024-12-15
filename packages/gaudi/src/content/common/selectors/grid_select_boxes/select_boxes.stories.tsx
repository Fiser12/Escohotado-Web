import { Meta, StoryObj } from "@storybook/react";
import { SelectBoxes } from ".";

const meta: Meta<typeof SelectBoxes> = {
    title: "Molecules/Selectors",
    component: SelectBoxes,
    parameters: {
        layout: "centered",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=420-1227&t=T6gQySPAwetTNvaR-4",
        },
    },
};

export default meta; 

type Story = StoryObj<typeof meta>;

export const Grid: Story = {
    name: "Grid Box",
    args: {
        options: [
            {id: "1", label: "eBook"},
            {id: "2", label: "Tapa blanda"},
            {id: "3", label: "Tapa dura"}
        ]
    },
};