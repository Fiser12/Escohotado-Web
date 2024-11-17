import { CollectionBeforeChangeHook, Field } from 'payload'
import { COLLECTION_SLUG_PERMISSION, COLLECTION_SLUG_TAXONOMY } from '../config'

export const permissionRelationship: () => Field[] = () => {
  return [
    {
      name: 'permissions',
      label: 'Permissions',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_PERMISSION,
      defaultValue: [],
      hasMany: true,
      required: false,
    },
    {
      name: 'permissions_seeds',
      label: "Permission Seeds",
      type: 'text',
      defaultValue: "",
      admin: { position: 'sidebar', readOnly: true, hidden: false },
    }
  ]
}

export const populatePermissionSeedsHook: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (data['permissions'].length === 0)
    return {
      ...data,
      ['permissions_seeds']: "",
    }
  const taxonomies = await req.payload.find({
    collection: COLLECTION_SLUG_PERMISSION,
    where: { id: { in: data['permissions'] } },
  })

  const seeds = taxonomies.docs
    .mapNotNull((taxonomy) => taxonomy.slug)

  return {
    ...data,
    ['permissions_seeds']: seeds.join(' '),
  }
}

