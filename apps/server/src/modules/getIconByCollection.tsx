import { ArticleIcon } from "@/components/common/icons/searchbar/article_icon";
import { BookIcon } from "@/components/common/icons/searchbar/book_icon";
import { QuoteIcon } from "@/components/common/icons/searchbar/quote_icon";
import { VideoIcon } from "@/components/common/icons/searchbar/video_icon";
import { collectionsContentsSlugs } from "@/core/collectionsSlugs";

export const getIconByCollection = (collection: typeof collectionsContentsSlugs[number]): React.ReactNode => {
  switch (collection) {
    case "article_web":
      return <ArticleIcon />;
    case "book":
      return <BookIcon />;
    case "video":
      return <VideoIcon />;
    case "quote":
      return <QuoteIcon />;
  }
}