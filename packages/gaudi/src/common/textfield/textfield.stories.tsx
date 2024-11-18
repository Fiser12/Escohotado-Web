import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './textfield';
import { EmailIcon } from '../icons/email_icon';

const meta: Meta<typeof TextField> = {
    title: 'Atoms/Inputs',
    component: TextField,
    argTypes: {
        state: {
            control: {
                type: 'select',
                options: ['enabled', 'disabled'],
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

export const Textfield: Story = {
    name: 'Textfield',
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=339-3531&t=mL310kV4x7dAEoiY-4'
        }
    },
    args: {
        label: 'Label',
        text: '',
        placeholder: 'Placeholder',
        error: '',
        icon: true,
        state: 'enabled',
    },
    render: (args) => (
        <TextField {...args} icon={args.icon ? <EmailIcon /> : null} />
    ),
}


