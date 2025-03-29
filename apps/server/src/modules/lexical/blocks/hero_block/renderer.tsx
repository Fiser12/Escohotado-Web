import Image from "next/image"
import { MainHero } from "@/components/content/common/hero"
import { LexicalRenderer } from "../../lexicalRenderer"
import { HeroBlock, Media } from "payload-types"
import { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer"

interface Props extends LexicalBlockProps<HeroBlock> {

}

export const renderer = async ({ node }: Props) => {
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
                    width={2610}
                    height={3036}
                    src={media.url ?? "/"}
                    alt={"Antonio Escohotado"}
                />
            }
        </>
        }
    >
        {content && <LexicalRenderer data={content} />}
    </MainHero>
}