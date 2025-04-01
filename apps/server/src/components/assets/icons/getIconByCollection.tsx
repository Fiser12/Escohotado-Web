import { collectionsContentsSlugs } from "@/core/collections-slugs";
import { ArticleIcon, BookIcon, VideoIcon, QuoteIcon } from "@/components/assets/icons";
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