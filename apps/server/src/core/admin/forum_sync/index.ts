import { CollectionSlug } from 'payload'
import { getPayload } from '../../infrastructure/payload/utils/getPayload'
import { updateForumDataAtCollection } from './update_forum_data_at_collection'
import { getCategoryByCollection } from './get_category_by_collection'
import 'hegel'
import { createTopicAtForumCommand } from './create_topic_at_forum_command'

const syncForumWithDatabase = async (collection: CollectionSlug) => {
  const payload = await getPayload()
  payload.logger.warn(`Starting sync of forum content to ${collection} collection`)

  const datas = await payload.find({
    collection,
    pagination: false,
    select: { id: true, forum_post_id: true, title: true, slug: true },
  })

  const idAssociations: Record<string, { id: string; forumId: string }> = {}

  for (const doc of datas.docs) {
    const { forum_post_id, id, title, slug } = doc as any
    const categoryId = getCategoryByCollection(collection, slug)

    if (!forum_post_id) {
      try {
        const newForumPostId = await createTopicAtForumCommand(
          payload,
          `Debate sobre: ${title} - Test`,
          categoryId,
        )
        if (newForumPostId) {
          idAssociations[id] = { id, forumId: newForumPostId }
        } else {
          payload.logger.error(`Error obteniendo el id para el tema en el foro ${title}`)
        }
      } catch (error) {
        payload.logger.error(`Error en la creación del topic: ${error}`)
      }
    } else {
      idAssociations[id] = { id, forumId: forum_post_id }
    }
  }

  const promises = Object.values(idAssociations).map(async ({ forumId, id }) => {
    try {
      await updateForumDataAtCollection(payload, collection, id, forumId)
      payload.logger.info(`Actualizado correctamente: ${id}`)
    } catch (error) {
      payload.logger.error(`Error actualizando ${id}: ${error}`)
    }
  })

  await Promise.all(promises)
  payload.logger.warn('Sincronización completada.')
}

export default syncForumWithDatabase
