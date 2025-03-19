import { addClearCacheHookBeforeChange } from "../content/content_collection_builder";
import { gridCards } from "./grid_cards";
import { uiBLock } from "./ui_block";

export const uiCollections = [
    addClearCacheHookBeforeChange(gridCards),
    addClearCacheHookBeforeChange(uiBLock)
]