import type { Meta, StoryObj } from '@storybook/react'
import { SortSelector } from './sort_selector_bar'

const meta: Meta<typeof SortSelector> = {
    title: 'Modules/Nuqs/SortSelector',
    component: SortSelector,
    parameters: {
        layout: 'centered'
    },
    decorators: [
        (Story) => (
            <div className="w-full max-w-4xl p-4">
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {}
} 