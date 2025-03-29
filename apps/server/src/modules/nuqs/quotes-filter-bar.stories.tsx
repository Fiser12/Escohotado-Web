import type { Meta, StoryObj } from '@storybook/react'
import { QuotesFilterBar } from './quotes-filter-bar'

const mockTags = {
    filosofia: { id: 1, slug: 'filosofia', label: 'Filosofía' },
    libertad: { id: 2, slug: 'libertad', label: 'Libertad' },
    religion: { id: 3, slug: 'religion', label: 'Religión' },
    homenaje: { id: 4, slug: 'homenaje', label: 'Homenajes' },
    veneno: { id: 5, slug: 'veneno', label: 'Venenos' }
}

const meta: Meta<typeof QuotesFilterBar> = {
    title: 'Modules/Nuqs/QuotesFilterBar',
    component: QuotesFilterBar,
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
    args: {
        listOfTags: mockTags
    }
} 