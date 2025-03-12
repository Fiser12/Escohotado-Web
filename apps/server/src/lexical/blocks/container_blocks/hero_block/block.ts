import { Block } from 'payload'
import { heroBlockSlug } from '../../slug_blogs'
import { buildLexical } from '@/lexical/lexicalBuilder'
import { internalLexicalBlocks } from '@/lexical/internalLexicalBuilder'
import { COLLECTION_SLUG_MEDIA } from 'hegel/payload'

const editor = buildLexical(internalLexicalBlocks)

export const HeroBlock: Block = {
  slug: heroBlockSlug,
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero panel',
    plural: 'Hero panel',
  },
  fields: [
    {
      'name': 'items',
      'type': 'array',
      'fields': [
        {
          name: 'cover',
          type: 'upload',
          relationTo: COLLECTION_SLUG_MEDIA,
          hasMany: false,
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          }
        },
        {
          label: 'Título',
          name: 'title',
          type: 'text',
          localized: true
        },
        {
          label: 'Año',
          name: 'year',
          type: 'number'
        },
        {
          label: 'Descripción',
          name: 'description',
          type: 'richText',
          localized: true,
          editor
        }    
      ]
    }
    
  ]
}

