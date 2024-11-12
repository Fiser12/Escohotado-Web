import { Meta, StoryObj } from '@storybook/react';
import { MainButton } from './main_button';
import { EmailIcon } from '../icons/email_icon';
import { url } from 'inspector';

const meta: Meta<typeof MainButton> = {
    title: 'Common/Atoms/Button/Primary',
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
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=55-117&m=dev',
        },
    },
    args: {
        text: 'Primary Fill Button',
        color: 'primary',
        type: 'fill',
        icon: false,
    },
};

// Line
export const Line: Story = {
    name: 'Line',
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=3-88&m=dev',
        },
    },
    args: {
        text: 'Primary Line Button',
        color: 'primary',
        type: 'line',
        icon: false,
    },
};

// Icon Fill
export const WithIconFill: Story = {
    name: 'With Icon Fill',
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=64-221&m=dev',
        },
    },
    args: {
        text: 'Button with Icon',
        color: 'primary',
        type: 'fill',
        icon: true,
    },
    render: (args) => (
        <MainButton {...args} icon={<EmailIcon />} />
    ),
};

// Icon Line
export const WithIconLine: Story = {
    name: 'With Icon Line',
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=64-251&m=dev',
        },
    },
    args: {
        text: 'Button with Icon',
        color: 'primary',
        type: 'line',
        icon: true,
    },
    render: (args) => (
        <MainButton {...args} icon={<EmailIcon />} />
    ),
};
