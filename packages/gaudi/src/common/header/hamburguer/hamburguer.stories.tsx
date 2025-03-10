import { Meta, StoryObj } from '@storybook/react'
import { Hamburguer } from '.'

const meta: Meta<typeof Hamburguer> = {
      title: 'Atoms',
      component: Hamburguer,
      parameters: {
            layout: 'centered',
            design: {
                  type: 'figspec',
                  url: ''
            }
      }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
      name: "Hamburguer",
};