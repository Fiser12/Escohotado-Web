import { Meta, StoryObj } from '@storybook/react';
import { MainButton } from './main_button';
import { EmailIcon } from '../icons/email_icon';

const meta: Meta<typeof MainButton> = {
    title: 'Atoms/Button/Secondary',
    component: MainButton,
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=55-116&t=mL310kV4x7dAEoiY-4',
        },
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
    render: (args) => (
        <MainButton {...args} icon={args.icon ? <EmailIcon /> : null} />
    ),
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
    render: (args) => (
        <MainButton {...args} icon={args.icon ? <EmailIcon /> : null} />
    ),
};

