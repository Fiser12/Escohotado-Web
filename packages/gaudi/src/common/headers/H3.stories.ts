import type { Meta, StoryObj } from '@storybook/react';
import { H3 } from './H3';

const meta = {
    title: 'Atoms/Headers/H3',
    component: H3,
    args: {
        label: 'Sample Heading 3',
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
