import type { Field } from 'payload'

export const forumPostsCacheField: Field = {
  type: 'collapsible',
  label: 'Datos relacinados con el foro',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'forum_post_id',
          label: 'ID del post en el foro',
          type: 'text',
        },
        {
          name: 'last_forum_sync',
          label: 'Fecha de sincronización con el foro',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'last_forum_posts',
      label: 'Posts del foro',
      type: 'json',
      admin: {
        readOnly: true,
      },
    },
  ],
}
