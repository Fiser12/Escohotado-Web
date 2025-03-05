import { SearchCollection } from "@/core/content/searchElementsQuery";
import { SearchOptions } from "node_modules/gaudi/src/common/search_modal";

export const mapSearchOptionsToCollections = (option: SearchOptions): SearchCollection[] => {
  switch (option) {
    case "all":
      return ["article_web", "book", "video", "quote"];
    case "article":
      return ["article_web"];
    case "book":
      return ["book"];
    case "video":
      return ["video"];
    case "quote":
      return ["quote"];
    default:
      return [];
  }
};
