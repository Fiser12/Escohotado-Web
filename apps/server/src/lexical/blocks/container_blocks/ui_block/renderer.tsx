import { LexicalRenderer } from "@/lexical/lexicalRenderer"
import { getPayload } from "@/payload/utils/getPayload"

export const renderer = async (all:any) => {
    const payload = await getPayload()
    const block = await payload.findByID({
        id: all.node.fields.uiBlock.value.id,
        collection: 'ui_block'
    })
    return <div className="flex flex-col items-center justify-center w-full">
        <LexicalRenderer data={block.block} />
    </div>

}