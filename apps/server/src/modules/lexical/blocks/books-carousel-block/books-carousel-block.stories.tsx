import { mockBooks } from '@/core/mock-data/book.model'
import type { Meta, StoryObj } from '@storybook/react'
import { generateStoryForLexicalBlock } from 'payload-lexical-blocks-builder/renderer'
import { renderer } from './renderer'

const meta: Meta<typeof renderer> = {
    title: 'Modules/LexicalBlocks/BooksCarouselBlock',
    component: renderer,
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

export const Default: Story = generateStoryForLexicalBlock<typeof meta>({
    books: mockBooks,
    title: "Libros destacados",
    blockType: "books_carousel_block",
    blockName: "Libros destacados",
})