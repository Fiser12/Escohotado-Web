import { pdf } from "./pdf";
import { articleWeb } from "./articleWeb";
import { book } from "./book";
import { video } from "./video";
import { quote } from "./quote";
import { addClearCacheHookBeforeChange } from "./content_collection_builder";

export const contentCollections = [
    addClearCacheHookBeforeChange(pdf),
    addClearCacheHookBeforeChange(articleWeb),
    addClearCacheHookBeforeChange(book),
    addClearCacheHookBeforeChange(video),
    addClearCacheHookBeforeChange(quote)
]

