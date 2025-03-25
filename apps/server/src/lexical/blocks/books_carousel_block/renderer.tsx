import { COLLECTION_SLUG_BOOK } from "@/core/collectionsSlugs"
import { routes } from "@/core/routesGenerator"
import { CarouselBook } from "gaudi/server"

export const renderer = async ({ node }: any) => {
    const books = node.fields.books.map((book: any) => ({
        title: book.title,
        coverHref: book.cover.url,
        link: routes.nextJS.generateDetailHref({ collection: COLLECTION_SLUG_BOOK, value: book })
    }))
    return <CarouselBook books={books} title={node.fields.title}/>
}