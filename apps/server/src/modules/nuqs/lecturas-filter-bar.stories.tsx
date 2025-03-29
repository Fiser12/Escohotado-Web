import type { Meta, StoryObj } from '@storybook/react'
import { LecturasFilterBar } from './lecturas-filter-bar'

const mockTags = {
    filosofia: { id: 1, slug: 'filosofia', label: 'Filosofía' },
    libertad: { id: 2, slug: 'libertad', label: 'Libertad' },
    religion: { id: 3, slug: 'religion', label: 'Religión' },
    homenaje: { id: 4, slug: 'homenaje', label: 'Homenajes' },
    veneno: { id: 5, slug: 'veneno', label: 'Venenos' }
}

const meta: Meta<typeof LecturasFilterBar> = {
    title: 'Modules/Nuqs/LecturasFilterBar',
    component: LecturasFilterBar,
    parameters: {
        layout: 'centered'
    }
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
    args: {
        listOfTags: {}
    }
}
