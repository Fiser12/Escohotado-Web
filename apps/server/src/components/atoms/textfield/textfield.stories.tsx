import { Meta, StoryObj } from '@storybook/react';
import { TextField } from '.';
import { EmailIcon } from '@/components/assets/icons';
const meta: Meta<typeof TextField> = {
    title: 'Molecules/Inputs',
    component: TextField,
    argTypes: {
        label: {
            description: 'Etiqueta que describe el campo de texto.',
            control: 'text',
            type: { name: 'string', required: true },
          },
          text: {
            description: 'Texto inicial dentro del campo de entrada.',
            control: 'text',
            type: { name: 'string', required: false },
          },
          placeholder: {
            description: 'Texto de marcador de posición para el campo.',
            control: 'text',
            type: { name: 'string', required: true },
          },
          error: {
            description: 'Mensaje de error que se muestra debajo del campo.',
            control: 'text',
            type: { name: 'string', required: false },
          },
          state: {
            description: 'Estado del campo: "enabled" o "disabled".',
            control: { type: 'select' },
            options: ['enabled', 'disabled'],
            type: { name: 'string', required: false },
          },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Textfield: Story = {
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
        error: 'Sample error',
        icon: true,
        state: 'enabled',
    },
    render: (args) => (
        <TextField {...args} icon={args.icon ? <EmailIcon /> : null} />
    ),
}


