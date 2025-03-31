import { CarouselBook } from "@/components/organisms/book/carousel"
import { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer"
import { Book, BookCarouselBlock } from "payload-types"

interface Props extends LexicalBlockProps<BookCarouselBlock> {

}

export const renderer = async ({ node }: Props) => {
    const arrayBooks = node.fields.books?.cast<Book>() ?? []
    return <CarouselBook books={arrayBooks} title={node.fields.title} />
}