import { Block } from 'payload'
import { uiBlockSlug } from '../../slug_blogs'
import { permissionEvaluationField } from '@/core/auth/permissions/permissionEvaluationField'

export const UIBlock: Block = {
  slug: uiBlockSlug,
  interfaceName: 'UIBlock',
  labels: {
    singular: 'UI Block',
    plural: 'UI Blocks',
  },
  fields: [
    permissionEvaluationField,
    {
      label: 'UI Block',
      name: 'uiBlock',
      type: 'relationship',
      relationTo: ['ui_block'],
    }
  ],
}

