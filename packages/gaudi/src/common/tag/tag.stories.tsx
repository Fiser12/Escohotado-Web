import { Meta, StoryObj } from '@storybook/react';
import { Tag } from './tag';
import { Title, Subtitle, Canvas, Description, Controls, Stories } from "@storybook/blocks";

const meta: Meta<typeof Tag> = {
    title: 'Atoms/Tag',
    component: Tag,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=25-98&t=mL310kV4x7dAEoiY-4'
        },
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Canvas />
                    <Controls />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        text: {
            control: 'text',
        },
        variant: {
            options: ['light', 'primary'],
            control: { type: 'select' },
        },
        isActive: {
            control: 'boolean',
        },
        className: {
            control: 'text',
        },
    },
    args: {
        text: 'Sample tag',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

//Primary
export const Primary: Story = {
    name: 'Primary',
    args: {
        variant: 'primary',
    },
};

//Light
export const Light: Story = {
    name: 'Light',
    parameters: {
        backgrounds: {
            default: 'Gray',
        },
    },
    args: {
        variant: 'light',
    },
};

export const All: Story = {
    name: 'All',
    parameters: {
        backgrounds: {
            default: 'Gray',
        },
    },
    render: (args) => (
        <div className="flex gap-4 flex-wrap">
            <Tag {...args} />
            <Tag {...args} variant="light" />
        </div>
    ),
}