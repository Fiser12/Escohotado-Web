import { CollectionBeforeChangeHook } from 'payload'
import { COLLECTION_SLUG_TAXONOMY } from '../config'


export const populateSeedHook: CollectionBeforeChangeHook = async ({data, req}) => {
    if (!data.parent) return {
        ...data,
        seed: data.slug
    }
    const parent = await req.payload.findByID({collection: COLLECTION_SLUG_TAXONOMY, id: data.parent})
    data.seed = parent?.seed ? parent.seed + "/" + data.slug : data.slug
    return data
}