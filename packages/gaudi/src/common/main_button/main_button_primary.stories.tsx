import { Meta, StoryObj } from '@storybook/react';
import { MainButton } from './main_button';
import { EmailIcon } from '../icons/EmailIcon';

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
        classname: {
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
        text: 'Primary Fill Button',
        color: 'primary',
        type: 'fill',
        icon: false,
    },
};

// Line
export const Line: Story = {
    name: 'Line',
    args: {
        text: 'Primary Line Button',
        color: 'primary',
        type: 'line',
        icon: false,
    },
};

// Icon
export const WithIcon: Story = {
    name: 'With Icon',
    args: {
        text: 'Button with Icon',
        color: 'primary',
        type: 'fill',
        icon: true,
    },
    render: (args) => (
        <MainButton {...args} icon={<EmailIcon height='14' />} />
    ),
};
