import Image from "next/image"
import { MainHero } from "@/components/organisms/lexical/hero"
import type { HeroBlock, Media } from "payload-types"
import type { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer"
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer"
import { Services, servicesProd } from "@/modules/services"
interface Props extends LexicalBlockProps<HeroBlock> {
    services?: Services
}

export const renderer = async ({ node, services = servicesProd }: Props) => {
    const { content, media: mediaPayload, inverted, media_type } = node.fields
    const media = typeof mediaPayload === "number" ? null : mediaPayload as Media
    const mimeType = media?.mimeType?.includes("video") ? "video" : "image"
    const controls = media_type == "normal"
    const isAutoplay = media_type == "muted"

    return <MainHero
        className="ignore-wrapper"
        changeDirection={inverted ?? false}
        media={<>
            {media && mimeType === "video" &&
                <video controls={controls} muted={isAutoplay} autoPlay={isAutoplay} loop={isAutoplay}>
                    <source src={media.url ?? "/"} type={media.mimeType ?? "video/mp4"} />
                    Tu navegador no admite la reproducción de videos.
                </video>
            }
            {media && mimeType === "image" &&
                <Image
                    width={media.width ?? 1000}
                    height={media.height ?? 1000}
                    src={media.url ?? "/"}
                    alt={"Antonio Escohotado"}
                />
            }
        </>
        }
    >
        {content && <LexicalRenderer 
            data={content} 
            services={services}
        />}
    </MainHero>
}