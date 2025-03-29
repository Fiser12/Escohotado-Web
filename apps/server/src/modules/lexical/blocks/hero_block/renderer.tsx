import Image from "next/image"
import { MainHero } from "@/components/content/common/hero"
import { LexicalRenderer } from "../../lexicalRenderer"
export const renderer = async ({ node }: any) => {
    const { content, media, inverted, media_type } = node.fields
    const mimeType = media?.mimeType?.includes("video") ? "video" : "image"
    const controls = media_type == "normal"
    const isAutoplay = media_type == "muted"
    return <MainHero
        className="ignore-wrapper"
        changeDirection={inverted}
        media={<>
            { mimeType === "video" &&
            <video controls={controls} muted={isAutoplay} autoPlay={isAutoplay} loop={isAutoplay}>
                <source src={media.url} type={media?.mimeType} />
                Tu navegador no admite la reproducción de videos.
            </video>
          }
            { mimeType === "image" &&
                <Image
                    width={2610}
                    height={3036}
                    src={media.url}
                    alt={"Antonio Escohotado"}
                />
            }
            </>
        }
    >
        <LexicalRenderer data={content} />
    </MainHero>
}