import { CollectionSlug } from 'payload'
import { getCategoryByCollection } from './get_category_by_collection'
import 'hegel'
import { syncTopicsAtForumCommand } from './sync_topics_at_forum_command'
import { updateForumDataAtCollection } from './update_forum_data_at_collection'
import { getPayload } from '@/payload/utils/getPayload'

const syncForumWithDatabase = async (collection: CollectionSlug, batchSize: number = 100) => {
  const payload = await getPayload();
  payload.logger.warn(`Starting sync of forum content to ${collection} collection`);

  const datas = await payload.find({
    collection,
    pagination: false,
    select: { 
      id: true, 
      forum_post_id: true, 
      title: true,
      slug: true ,
      url_free: true,
      url: true,
    },
  });

  const items = datas.docs.map((doc) => {
    const { forum_post_id, id, title, slug, url_free } = doc as any;
    const cid = getCategoryByCollection(collection, slug);
    return { 
      id,
      title: `Debate sobre: ${title.replace(".pdf", "")}`,
      content: url_free || '',
      cid,
      tid: forum_post_id,
    };
  });

  const chunkArray = <T>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const itemBatches = chunkArray(items, batchSize);

  for (const batch of itemBatches) {
    try {
      const response = await syncTopicsAtForumCommand(batch);
      const updatePromises: Promise<void>[] = response.map(async (item) => {
        await updateForumDataAtCollection(payload, collection, item.itemId, item.tid, item.lastPosts);
      });
      await Promise.all(updatePromises);
      payload.logger.warn(`Batch of ${batch.length} items synced.`);

    } catch (error) {
      payload.logger.error('Error en la sincronización por lotes: ', error);
    }
  }

  payload.logger.warn('Sincronización completada.');
};

export default syncForumWithDatabase
