import type { Meta, StoryObj } from '@storybook/react'
import { renderer } from './renderer'
import { mockBooks } from '@/components/mockData/book.model'
import { generateStoryForLexicalBlock } from 'payload-lexical-blocks-builder/renderer'

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

export const Default: Story = generateStoryForLexicalBlock({
    books: mockBooks,
    title: "Libros destacados",
    blockType: "books_carousel_block",
    blockName: "Libros destacados",
})