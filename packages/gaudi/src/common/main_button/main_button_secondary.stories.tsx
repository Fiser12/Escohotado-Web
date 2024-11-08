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
    args: {
        text: 'Secondary Fill Button',
        color: 'secondary',
        type: 'fill',
        icon: false,
    },
};

// Line
export const Line: Story = {
    name: 'Line',
    args: {
        text: 'Secondary Line Button',
        color: 'secondary',
        type: 'line',
        icon: false,
    },
};

// Icon
export const WithIcon: Story = {
    name: 'With Icon',
    args: {
        text: 'Button with Icon',
        color: 'secondary',
        type: 'fill',
        icon: true,
    },
    render: (args) => (
        <MainButton {...args} icon={<EmailIcon />} />
    ),
};