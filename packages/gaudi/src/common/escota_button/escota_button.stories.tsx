import { Meta, StoryObj } from '@storybook/react';
import { EscotaButton } from './escota_button';

// Configuración de la historia
const meta = {
    title: 'Common/Atoms/Button',
    component: EscotaButton,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=55-116&m=dev'
        }
    },
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['primary', 'secondary', 'transparent'],
            },
        },
        noBreak: {
            control: 'boolean',
        },
        classname: {
            control: 'text',
        },
        fitContent: {
            control: 'boolean',
        },
    },
} as Meta<typeof EscotaButton>;

export default meta

type Story = StoryObj<typeof meta>;

// Historia predeterminada
export const Primary: Story = {
    args: {
        text: 'Primary Button',
        variant: 'primary',
        noBreak: false,
        fitContent: true,   
    }
};

// Historia secundaria
export const Secondary: Story = {
	args: {
        text: 'Secondary Button',
        variant: 'secondary',
        noBreak: false,
        fitContent: true,
    }
};

// Historia transparente
export const Transparent: Story = {
	args: {
        text: 'Transparent Button',
        variant: 'transparent',
        noBreak: false,
        fitContent: true,
    }
};