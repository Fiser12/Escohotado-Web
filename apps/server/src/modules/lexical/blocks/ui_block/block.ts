import { Block } from 'payload'
import { uiBlockSlug } from '../slug_blogs'
import { permissionEvaluationField } from 'payload-access-control'

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
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'displayMode',
          label: 'Modo de visualización',
          defaultValue: 'sequential',
          options: [
            { label: 'Secuencial', value: 'sequential' },
            { label: 'Rotacional', value: 'rotational' },
          ],
        },
        {
          type: 'number',
          name: 'windowSize',
          defaultValue: 3,
          label: 'Tamaño de ventana (días)',
          admin: {
            condition: (_, siblingData) => siblingData.displayMode === 'rotational',
          },
        }    
      ]
    },
    {
      label: 'UI Block',
      name: 'uiBlocks',
      hasMany: true,
      type: 'relationship',
      relationTo: ['ui_block'],
    }
  ],
}

