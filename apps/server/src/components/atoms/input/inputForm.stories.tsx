import { Meta, StoryObj } from '@storybook/react';
import { InputForm } from '.';

const meta: Meta<typeof InputForm> = {
      title: 'Atoms',
      component: InputForm,
      argTypes: {
        label: {
            description: 'Etiqueta asociada al input.',
            control: 'text',
            type: { name: 'string', required: true },
          },
          text: {
            description: 'Texto predefinido dentro del input.',
            control: 'text',
            type: { name: 'string', required: false },
          },
          placeholder: {
            description: 'Texto que aparece como marcador de posición en el input.',
            control: 'text',
            type: { name: 'string', required: true },
          },
          state: {
            description: 'Estado del input, puede ser "enabled" o "disabled".',
            control: { type: 'select' },
            options: ['enabled', 'disabled'],
            type: { name: 'string', required: false },
          },
          className: {
            description: 'Clases adicionales para personalizar el estilo del componente.',
            control: 'text',
            type: { name: 'string', required: false },
          },
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Input: Story = {
    name: 'Input Form',
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: '',
        }
    },
    args: {
        label: 'Label',
        text: '',
        placeholder: 'Placeholder',
        state: 'enabled',
    },
}