import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { Services, servicesProd } from "@/modules/services";
import { getPayload } from "@/payload/utils/get-payload";
import { evalAdvancePermissionQuery } from "payload-access-control";
import { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer";
import { UIBlock } from "payload-types";
interface Props extends LexicalBlockProps<UIBlock> {
    services?: Services
}

export const renderer = async ({ node, services = servicesProd }: Props) => {
    const blocks = node?.fields?.uiBlocks?.map((block: any) => block.value) || []
    if (blocks.length === 0) return <p>No hay bloques para mostrar</p>
    const permissions = typeof node.fields.permissions?.value === "number"
        ? null
        : node.fields.permissions?.value
    const user = await getCurrentUserQuery()
    const hasPermission = await evalAdvancePermissionQuery(
        user,
        node.fields.type_of_permissions ?? "all",
        permissions?.slug
    )
    if (!hasPermission) return null

    const blocksToShow = getBlockToShow(blocks, node.fields.displayMode, node.fields.windowSize)
    const payload = await getPayload()

    return <div className="flex flex-col items-center justify-center w-full gap-4">
        {await Promise.all(blocksToShow.map(async (block) => {
            if (!block.id) return null
            const blockData = await payload.findByID({
                id: block.id,
                collection: 'ui_block'
            })
            return <LexicalRenderer
                key={block.id}
                data={blockData.block}
                services={services}
            />
        }))}
    </div>
}

const getDayOfYear = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
}

const getBlockToShow = (blocks: UIBlock[], displayMode?: string | null, windowSize?: number | null) => {
    if (!displayMode || displayMode === 'sequential') {
        return blocks
    }
    if (!windowSize) return blocks

    const dayOfYear = getDayOfYear()
    const windowIndex = Math.floor(dayOfYear / windowSize)
    const blockIndex = windowIndex % blocks.length
    return [blocks[blockIndex]]
}
