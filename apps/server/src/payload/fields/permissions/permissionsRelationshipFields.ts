import { CollectionBeforeChangeHook, Field, FieldHook } from 'payload'
import { COLLECTION_SLUG_PERMISSION } from 'hegel/payload'
import 'hegel'

export function permissionRelationship(
  permissionsName: string = 'permissions',
  permissionsSeedsName: string = 'permissions_seeds',
  beforeChangeHook: FieldHook | null = null,
): Field[] {
  return [
    {
      name: permissionsName,
      label: 'Permissions',
      type: 'relationship',
      hooks: {
        beforeValidate: [beforeChangeHook].mapNotNull((hook) => hook),
      },
      relationTo: COLLECTION_SLUG_PERMISSION,
      defaultValue: [],
      hasMany: true,
      required: false,
    },
    {
      name: permissionsSeedsName,
      label: 'Permission Seeds',
      type: 'text',
      defaultValue: '',
      admin: { position: 'sidebar', readOnly: true, hidden: false },
    },
  ]
}

export function cachePermissionSeedsHook(
  permissionsName: string = 'permissions',
  permissionsSeedsName: string = 'permissions_seeds',
): CollectionBeforeChangeHook {
  return async ({ data, req }) => {
    if (data[permissionsName].length === 0)
      return {
        ...data,
        [permissionsSeedsName]: '',
      }
    const taxonomies = await req.payload.find({
      collection: COLLECTION_SLUG_PERMISSION,
      where: { id: { in: data[permissionsName] } },
    })

    const seeds = taxonomies.docs.mapNotNull((taxonomy) => taxonomy.slug)

    return {
      ...data,
      [permissionsSeedsName]: seeds.join(' '),
    }
  }
}
