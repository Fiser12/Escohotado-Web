import type { Meta, StoryObj } from '@storybook/react'
import { FilterBar } from './filter_bar'

const mockTags = {
    filosofia: { id: 1, slug: 'filosofia', label: 'Filosofía' },
    libertad: { id: 2, slug: 'libertad', label: 'Libertad' },
    religion: { id: 3, slug: 'religion', label: 'Religión' },
    homenaje: { id: 4, slug: 'homenaje', label: 'Homenajes' },
    veneno: { id: 5, slug: 'veneno', label: 'Venenos' }
}

const meta: Meta<typeof FilterBar> = {
    title: 'Modules/Nuqs/FilterBar',
    component: FilterBar,
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
        title: 'Etiquetas',
        multiple: false,
        initialValue: [],
        setValue: () => { },
        listOfTags: mockTags
    }
} 