import type { Meta, StoryObj } from '@storybook/react';
import { H3 } from './H3';

const meta = {
    title: 'Common/Atoms/Typography/H3',
    component: H3,
    args: {
        label: 'Sample Heading',
        variant: 'primary',
    },
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev',
        },
    },
} satisfies Meta<typeof H3>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    parameters: {},
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'Secondary Heading',
    },
};

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        label: 'Tertiary Heading',
    },
};
