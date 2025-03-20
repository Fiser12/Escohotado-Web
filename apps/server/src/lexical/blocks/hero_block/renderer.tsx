import { LexicalRenderer } from "@/lexical/lexicalRenderer"
import { MainHero } from "gaudi/server"
import Image from "next/image"

export const renderer = async ({ node }: any) => {
    const { content, media, inverted } = node.fields
    const mimeType = media?.mimeType?.includes("video") ? "video" : "image"
    return <MainHero
        changeDirection={inverted}
        media={<>
            { mimeType === "video" &&
                <></>
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