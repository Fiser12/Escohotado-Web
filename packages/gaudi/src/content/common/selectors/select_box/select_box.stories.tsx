import { Meta, StoryObj } from "@storybook/react";
import { SelectBox } from ".";

const meta: Meta<typeof SelectBox> = {
    title: "Atoms/Selectors/Box",
    component: SelectBox,
    parameters: {
        layout: "centered",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=420-1227&t=T6gQySPAwetTNvaR-4",
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the selector" },
    },
};

export default meta; 

type Story = StoryObj<typeof meta>;

export const Box: Story = {
    name: "Box",
    args: {
        title: "Sample Title",
        isSelected: true
    },
};