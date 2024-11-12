import { Meta, StoryObj } from '@storybook/react';
import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
    title: 'Common/Atoms/Tag',
    component: Tag,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/design/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=25-98&m=dev'
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

