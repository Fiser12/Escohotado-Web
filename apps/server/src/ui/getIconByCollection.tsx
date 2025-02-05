import { ArticleIcon, BookIcon, VideoIcon, QuoteIcon } from "gaudi/client";
import { collectionsContentsSlugs } from "hegel/payload";

export const getIconByCollection = (collection: typeof collectionsContentsSlugs[number]): React.ReactNode => {
    switch(collection) {
      case "article_pdf":
      case "article_web":
        return <ArticleIcon/>;
      case "book":
        return <BookIcon/>;
      case "video":
        return <VideoIcon/>;
      case "quote":
        return <QuoteIcon/>;
    }
  }