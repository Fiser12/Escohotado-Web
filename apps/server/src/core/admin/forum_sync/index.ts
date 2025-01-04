import { CollectionSlug } from 'payload'
import { getPayload } from '../../infrastructure/payload/utils/getPayload'
import 'hegel'
import { updateForumDataAtCollection } from './update_forum_data_at_collection'

const syncForumWithDatabase = async (collection: CollectionSlug) => {
  const payload = await getPayload()
  payload.logger.warn(`Starting sync of forum content to ${collection} collection`)
  const datas = await payload.find({
    collection,
    pagination: false,
    select: { id: true, forum_post_id: true },
  })
  await datas.docs.map(async ({ forum_post_id, id }: any) => {
    try {
      await updateForumDataAtCollection(payload, collection, id, forum_post_id)
    } catch (error) {
      payload.logger.error(`Error updating ${id}: ${error}`)
    }
  })

  payload.logger.warn('Sincronización completada.')
}

export default syncForumWithDatabase
