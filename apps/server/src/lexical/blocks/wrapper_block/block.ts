import { Block } from 'payload'
import { wrapperBlockSlug } from '../slug_blogs'
import { permissionEvaluationField } from 'payload-access-control'
import { lexicalEditorExcludingBlocks } from '@/lexical/lexicalEditorExcludingBlocks'

const editor = lexicalEditorExcludingBlocks(['wrapper_block'])

export const WrapperBlock: Block = {
  slug: wrapperBlockSlug,
  interfaceName: 'WrapperBlock',
  labels: {
    singular: 'Wrapper',
    plural: 'Wrapper',
  },
  fields: [
    permissionEvaluationField,
    {
      type: 'select',
      name: 'type',
      label: 'Estilo del fondo',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Gris', value: 'gray' },
      ],
    },
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
      localized: true,
      editor,
    },
  ],
}
