import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";

const config = nestedDocsPlugin({
      collections: ['taxonomy'],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }
)

export default config;