import { PhotosCarouselBlock } from "payload-types"
import { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer"
import { Carouseltem } from "@/components/organisms/lexical/photo_carousel"
import { PhotoCarousel } from "@/components/organisms/lexical/photo_carousel"
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer"
import { Services, servicesProd } from "@/modules/services"

interface Props extends LexicalBlockProps<PhotosCarouselBlock> {
    services?: Services
}

export const renderer = async ({ node, services = servicesProd }: Props) => {
    const items: Carouseltem[] = node.fields.items?.map((item) => {
        return {
            photoHref: typeof item.cover === "number" ? "" : item.cover.url ?? "",
            title: item.title ?? "",
            description: <>
                {item.description && <LexicalRenderer
                    data={item.description}
                    useContentWrapper={false}
                    services={services}
                />}
            </>,
            year: item.year
        }
    }) ?? []

    return <PhotoCarousel items={items} />
}