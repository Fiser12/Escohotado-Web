import { LexicalRenderer } from "../../lexicalRenderer"
import { PhotosCarouselBlock } from "payload-types"
import { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer"
import { Carouseltem } from "@/components/organisms/common/photo_carousel"
import { PhotoCarousel } from "@/components/organisms/common/photo_carousel"
interface Props extends LexicalBlockProps<PhotosCarouselBlock> {
}

export const renderer = async ({ node }: Props) => {
    const items: Carouseltem[] = node.fields.items?.map((item) => {
        return {
            photoHref: typeof item.cover === "number" ? "" : item.cover.url ?? "",
            title: item.title ?? "",
            description: <>
                {item.description && <LexicalRenderer data={item.description} useContentWrapper={false} />}
            </>,
            year: item.year
        }
    }) ?? []

    return <PhotoCarousel items={items} />
}