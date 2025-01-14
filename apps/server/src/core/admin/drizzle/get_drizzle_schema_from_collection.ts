import { CollectionSlug } from "payload";
import { video, article_pdf, article_web, book } from '@/payload-generated-schema'
import { PgTable } from "@payloadcms/db-postgres/drizzle/pg-core";

export const getDrizzleSchemaFromCollection = (collection: CollectionSlug): PgTable => {
    switch (collection) {
        case 'video':
        return video
        case 'article_pdf':
        return article_pdf
        case 'article_web':
        return article_web
        case 'book':
        return book
        default:
        throw new Error(`Collection ${collection} not found`)
    }
}