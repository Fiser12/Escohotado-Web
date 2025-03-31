import { addClearCacheHookBeforeChange } from '@/payload/collections/content/content_collection_builder'
import { gridCards } from '@/payload/collections/ui/grid_cards'
import { uiBLock } from '@/payload/collections/ui/ui_block'

export const uiCollections = [
  addClearCacheHookBeforeChange(gridCards),
  addClearCacheHookBeforeChange(uiBLock),
]
