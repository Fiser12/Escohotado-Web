
import { BasePayload } from "payload";
import { COLLECTION_SLUG_PERMISSION, PERMISSIONS } from "payload-access-control";

export const seedPermissions = async (payload: BasePayload) => {
    const permissions = await payload.find({ collection: COLLECTION_SLUG_PERMISSION })
    PERMISSIONS
    .filter(permission => !permissions.docs.some((p) => p.slug === permission.slug))
    .forEach(async permission => {
        await payload.create({
            collection: COLLECTION_SLUG_PERMISSION,
            data: {
                slug: permission.slug,
                title: permission.title,
            }
        })
    })
}
