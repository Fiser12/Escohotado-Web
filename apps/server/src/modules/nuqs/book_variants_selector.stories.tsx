import type { Meta, StoryObj } from '@storybook/react'
import { BookVariantsSelector } from './book_variants_selector'

const mockEditions: { id: string, label: string, url: string }[] = [
    {
        id: '1',
        label: 'Libro',
        url: 'https://example.com/book-es'
    },
    {
        id: '2',
        label: 'Audiolibro',
        url: 'https://example.com/audiobook-es'
    }
]

const meta: Meta<typeof BookVariantsSelector> = {
    title: 'Modules/Nuqs/BookVariantsSelector',
    component: BookVariantsSelector,
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

export const WithSelectedVariant: Story = {
    args: {
        options: mockEditions
    }
}

