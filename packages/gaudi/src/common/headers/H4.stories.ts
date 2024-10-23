import type { Meta, StoryObj } from '@storybook/react';
import { H4 } from './H4.js';

const meta = {
    title: 'Common/Atoms/Typography/H4',
    component: H4,
    args: {
        label: 'Sample Heading',
    },
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev',
        },
    },
} satisfies Meta<typeof H4>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
