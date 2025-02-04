import { CarouselBook } from "gaudi/server"
import { COLLECTION_SLUG_BOOK, routes } from "hegel/payload"

export const renderer = async ({ node }: any) => {
    const books = node.fields.books.map((book: any) => ({
        title: book.title,
        coverHref: book.cover.url,
        link: routes.generateDetailHref({ collection: COLLECTION_SLUG_BOOK, value: book })
    }))
    return <CarouselBook books={books} title={node.fields.title}/>
}