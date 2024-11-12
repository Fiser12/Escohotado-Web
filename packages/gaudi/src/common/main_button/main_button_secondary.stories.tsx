import { Meta, StoryObj } from '@storybook/react';
import { MainButton } from './main_button';
import { EmailIcon } from '../icons/email_icon';

const meta: Meta<typeof MainButton> = {
    title: 'Common/Atoms/Button/Secondary',
    component: MainButton,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['fill', 'line'],
            },
        },
        className: {
            control: 'text',
        },
        icon: {
            control: 'boolean',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Fill
export const Fill: Story = {
    name: 'Fill',
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=59-120&m=dev',
        },
    },
    args: {
        text: 'Secondary Fill Button',
        color: 'secondary',
        type: 'fill',
        icon: false,
    },
    render: (args) => (
        <MainButton {...args} icon={args.icon ? <EmailIcon /> : undefined} />
    ),
};

// Line
export const Line: Story = {
    name: 'Line',
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=59-124&m=dev',
        },
    },
    args: {
        text: 'Secondary Line Button',
        color: 'secondary',
        type: 'line',
        icon: false,
    },
    render: (args) => (
        <MainButton {...args} icon={args.icon ? <EmailIcon /> : undefined} />
    ),
};

// Icon Fill
export const WithIconFill: Story = {
    name: 'With Icon Fill',
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=62-117&m=dev',
        },
    },
    args: {
        text: 'Button with Icon',
        color: 'secondary',
        type: 'fill',
        icon: true,
    },
    render: (args) => (
        <MainButton {...args} icon={args.icon ? <EmailIcon /> : undefined} />
    ),
};

// Icon Line
export const WithIconLine: Story = {
    name: 'With Icon Line',
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=64-239&m=dev',
        },
    },
    args: {
        text: 'Button with Icon',
        color: 'secondary',
        type: 'line',
        icon: true,
    },
    render: (args) => (
        <MainButton {...args} icon={args.icon ? <EmailIcon /> : undefined} />
    ),
};

