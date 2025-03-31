import { Meta, StoryObj } from '@storybook/react';
import { MainButton } from './main_button';
import { Title, Subtitle, Canvas, Controls, Stories } from "@storybook/blocks";
import { EmailIcon } from '@/components/assets/icons';

const meta: Meta<typeof MainButton> = {
    title: 'Atoms/Button',
    component: MainButton,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=55-116&t=mL310kV4x7dAEoiY-4',
        },
        componentSubtitle: 'Primary UI component for user interaction',
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Canvas />
                    <Controls />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        text: {
            control: 'text',
        },
        type: {
            options: [ 'fill', 'line' ],
            control: { type: 'select' },
        },
        color: {
            option: ['primary', 'secondary'],
            control: { type: 'select' },
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

export const Basic: Story = {
    args: {
        text: 'Sample Fill Button',
        color: 'primary',
        type: 'fill',
        icon: false,
    },
    render: (args) => (
            <MainButton {...args} icon={args.icon ? <EmailIcon /> : null} />
    ),
};

export const Line: Story = {
    args: {
        text: 'Sample Line Button',
        color: 'primary',
        type: 'line',
        icon: false,
    },
    render: (args) => (
        <MainButton {...args} icon={args.icon ? <EmailIcon /> : null} />
    ),
};

export const All: Story = {
    args: {
        text: 'Sample Button',
    },
    render: (args) => (
        <div className="flex gap-4 flex-wrap">
            <MainButton {...args} />
            <MainButton {...args} color="secondary" />
            <MainButton {...args} type='line' />
            <MainButton {...args} color="secondary"  type='line' />
            <MainButton {...args} icon={<EmailIcon />} />
            <MainButton {...args} icon={<EmailIcon />} color="secondary" />
            <MainButton {...args} icon={<EmailIcon />} type='line' />
            <MainButton {...args} icon={<EmailIcon />} color="secondary" type='line' />
        </div>
    ),
};