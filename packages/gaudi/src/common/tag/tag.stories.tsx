import { Meta, StoryObj } from '@storybook/react';
import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
    title: 'Atoms/Tags',
    component: Tag,
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=25-98&t=mL310kV4x7dAEoiY-4'
        }
    },
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['light', 'primary'],
            },
        },
        className: {
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

//Light
export const Light: Story = {
    name: 'Light',
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
    args: {
        text: 'Sample tag',
        variant: 'light',
    },
};

//Primary
export const Primary: Story = {
    name: 'Primary',
    args: {
        text: 'Sample tag',
        variant: 'primary',
    },
};

