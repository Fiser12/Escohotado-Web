import { LexicalRenderer } from "@/lexical/lexicalRenderer"
import { PhotoCarousel, type Carouseltem } from "gaudi/client"

export const renderer = async ({ node }: any) => {
    const items: Carouseltem[] = node.fields.items.map((item: any) => {
        return {
        photoHref: item.cover.url,
        title: item.title,
        description: <LexicalRenderer data={item.description} useContentWrapper={false} />,
        year: item.year
    }})

    return <PhotoCarousel items={items}/>
}