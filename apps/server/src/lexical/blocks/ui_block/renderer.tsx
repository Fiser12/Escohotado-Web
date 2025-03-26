import { evalAdvancePermissionQuery } from "payload-access-control"
import { LexicalRenderer } from "@/lexical/lexicalRenderer"
import { getPayload } from "@/payload/utils/getPayload"

export const renderer = async ({ node }:any) => {
    const id = node?.fields?.uiBlock?.value?.id
    if (id === undefined) return <p>Error Rendering</p>
    const payload = await getPayload()
    const block = await payload.findByID({
        id: node.fields.uiBlock.value.id,
        collection: 'ui_block'
    })
    const hasPermission = await evalAdvancePermissionQuery(
        node.fields.type_of_permissions,
        node.fields.permissions?.value?.slug
    )
    if (!hasPermission) return null
    
    return <div className="flex flex-col items-center justify-center w-full">
        <LexicalRenderer data={block.block} />
    </div>
}