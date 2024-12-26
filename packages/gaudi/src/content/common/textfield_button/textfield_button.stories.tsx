import { Meta, StoryObj } from '@storybook/react';
import { TextFieldButton } from '.';

const meta: Meta<typeof TextFieldButton> = {
    title: 'Molecules/Inputs',
    component: TextFieldButton,
    argTypes: {
        label: {
            description: 'Etiqueta que describe el campo de texto.',
            control: 'text',
            type: { name: 'string', required: true },
          },
          buttonText: {
            description: 'Texto que se muestra dentro del botón.',
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
          state: {
            description: 'Estado del campo: "enabled" o "disabled".',
            control: { type: 'select' },
            options: ['enabled', 'disabled'],
            type: { name: 'string', required: false },
          },
          className: {
            description: 'Clases CSS adicionales para personalización del componente.',
            control: 'text',
            type: { name: 'string', required: false },
          },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TextfieldButton: Story = {
    name: 'Textfield Button',
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=283-735&t=AxV99ntgTWcOMvSI-4'
        }
    },
    args: {
        label: 'Label',
        buttonText: 'Button Text',
        text: '',
        placeholder: 'Placeholder',
        state: 'enabled',
    },
}
