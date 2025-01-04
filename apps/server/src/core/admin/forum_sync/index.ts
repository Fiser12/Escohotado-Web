import { CollectionSlug } from 'payload'
import { getPayload } from '../../infrastructure/payload/utils/getPayload'
import { updateForumDataAtCollection } from './update_forum_data_at_collection'
import { getCategoryByCollection } from './get_category_by_collection'
import 'hegel'
const syncForumWithDatabase = async (collection: CollectionSlug) => {
  const payload = await getPayload();
  payload.logger.warn(`Starting sync of forum content to ${collection} collection`);

  const datas = await payload.find({
    collection,
    pagination: false,
    select: { id: true, forum_post_id: true, title: true, slug: true },
  });

  for (const doc of datas.docs) {
    const { forum_post_id, id, title, slug } = doc as any;
    try {
      await updateForumDataAtCollection(
        payload,
        collection,
        id,
        forum_post_id,
        title,
        getCategoryByCollection(collection, slug),
      );
      payload.logger.info(`Actualizado correctamente: ${id}`);
    } catch (error) {
      payload.logger.error(`Error actualizando ${id}: ${error}`);
    }
  }

  payload.logger.warn('Sincronización completada.');
};

export default syncForumWithDatabase
