import { mapTaxonomyToSlugs } from "@/core/mappers/mapTaxonomyToSlugs";
import { searchPlugin } from "@payloadcms/plugin-search";
import { COLLECTION_SLUG_VIDEO, COLLECTION_SLUG_QUOTE, COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, routes } from "hegel/payload";
import { Config } from "payload";

const config: (config: Config) => Config = searchPlugin({
      collections: [
        COLLECTION_SLUG_VIDEO,
        COLLECTION_SLUG_QUOTE,
        COLLECTION_SLUG_ARTICLE_WEB,
        COLLECTION_SLUG_BOOK,
      ],
      searchOverrides: {
        slug: 'search-results',
        fields: ({ defaultFields }: any) => [
          ...defaultFields,
          { name: 'tags', type: 'text', admin: { readOnly: true } },
          { name: 'permissions_seeds', type: 'text', admin: { readOnly: true } },
          { name: 'href', type: 'text', admin: { readOnly: true } }

        ],
      },
      defaultPriorities: {
        [COLLECTION_SLUG_VIDEO]: (doc: any) =>
          doc.publishedAt ? new Date(doc.publishedAt).getTime() : 0,
        [COLLECTION_SLUG_BOOK]: (doc: any) =>
          doc.publishedAt ? new Date(doc.publishedAt).getTime() : 0,
        [COLLECTION_SLUG_ARTICLE_WEB]: (doc: any) =>
          doc.publishedAt ? new Date(doc.publishedAt).getTime() : 0,
      },
      beforeSync: ({ originalDoc, searchDoc, ...rest }: any) => {
        const tags = Array.from(
            new Set(originalDoc.categories?.flatMap(mapTaxonomyToSlugs).filter(Boolean))
        ).join(" ")
        
        return {
          ...searchDoc,
          title: originalDoc.title ?? originalDoc.quote,
          href: routes.nextJS.generateDetailHref({ 
            collection: searchDoc.doc.relationTo, 
            value: { id: originalDoc.id, slug: originalDoc.slug } 
          }),
          tags: tags + " " + (originalDoc.tags?.join(" ") ?? ""),
          permissions_seeds: originalDoc.permissions_seeds ?? ""
        }
      }
    }
)

export default config;