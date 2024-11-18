import { Meta, StoryObj } from '@storybook/react';
import { Link } from './link';

const meta: Meta<typeof Link> = {
    title: 'Atoms/Links',
    component: Link,
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=106-1101&t=ywkogyBA7q9g27hy-4'
        }
    },
    argTypes: {
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Default',
    args: {
        text: 'Sample link',
    },
};
