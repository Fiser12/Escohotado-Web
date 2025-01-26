import type { Meta, StoryObj } from '@storybook/react';
import { H2 } from './H2';

const meta: Meta<typeof H2> = {
    title: 'Atoms/Headers/H2',
    component: H2,
    args: {
        label: 'Sample Heading 2',
    },
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev',
        },
    },
} satisfies Meta<typeof H2>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
