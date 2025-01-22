import { CarouselBook } from "gaudi/server"

export const renderer = async ({ node }: any) => {
    const books = node.fields.books.map((book: any) => ({
        title: book.title,
        coverHref: book.cover.url,
        link: "/biblioteca/" + book.slug,
    }))
    return <CarouselBook books={books} title={node.fields.title}/>
}