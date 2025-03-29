import { evalAdvancePermissionQuery } from "payload-access-control"
import { LexicalRenderer } from "@/modules/lexical/lexicalRenderer"
import { getPayload } from "@/payload/utils/getPayload"

const getDayOfYear = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
}

const getBlockToShow = (blocks: any[], displayMode: string | undefined, windowSize: number | undefined) => {
    if (!displayMode || displayMode === 'sequential') {
        return blocks
    }
    if (!windowSize) return blocks

    const dayOfYear = getDayOfYear()
    const windowIndex = Math.floor(dayOfYear / windowSize)
    const blockIndex = windowIndex % blocks.length
    return [blocks[blockIndex]]
}

export const renderer = async ({ node }: any) => {
    const blocks = node?.fields?.uiBlocks?.map((block: any) => block.value) || []
    if (blocks.length === 0) return <p>No hay bloques para mostrar</p>

    const hasPermission = await evalAdvancePermissionQuery(
        node.fields.type_of_permissions,
        node.fields.permissions?.value?.slug
    )
    if (!hasPermission) return null

    const blocksToShow = getBlockToShow(blocks, node.fields.displayMode, node.fields.windowSize)
    const payload = await getPayload()

    return <div className="flex flex-col items-center justify-center w-full gap-4">
        {await Promise.all(blocksToShow.map(async (block) => {
            const blockData = await payload.findByID({
                id: block.id,
                collection: 'ui_block'
            })
            return <LexicalRenderer key={block.id} data={blockData.block} />
        }))}
    </div>
}