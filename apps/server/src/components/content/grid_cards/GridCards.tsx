import React from 'react'

import classNames from 'classnames'
import { ContentCardModel } from "hegel"
import { ArticleCard } from './cards/article'
import { QuoteCard } from './cards/quote'
import { BookCard } from './cards/book'
import { VideoCard } from './cards/video'
import { MediaCard } from './cards/media'

export const renderFeatured = (item: ContentCardModel) => {
  switch (item.type) {
    case "article":
      return (
        <ArticleCard
          key={item.id}
          className={item.className}
          title={item.title}
          hasPermission={item.hasPermission}
          author={item.author}
          coverHref={item.coverHref}
          href={item.detailHref}
          categories={item.categories}
        />
      );
    case "quote":
      return (
        <QuoteCard
          key={item.id}
          itemId={item.id}
          origen={item.origen}
          className={item.className}
          categories={item.categories}
          quote={item.quote}
          author={item.author}
        />
      );
    case "book":
      return (
        <BookCard
          key={item.id}
          className={item.className}
          title={item.title}
          detailHref={item.detailHref}
          quote={item.quote}
          author={item.author}
          coverHref={item.coverHref}
        />
      );
    case "video":
      return (
        <VideoCard
          key={item.id}
          className={item.className}
          title={item.title}
          hasPermission={item.hasPermission}
          coverHref={item.coverHref}
          detailHref={item.detailHref}
          href={item.href ?? "https://placehold.co/error"}
          publishedAt={item.publishedAt}
          categories={item.categories}
          unlockHref={"/subscriptions"}
        />
      );
    case "media":
      return <MediaCard
        mediaHref={item.mediaHref!}
        alt={item.title}
      />
    default:
      return null;
  }
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  features: ContentCardModel[]
  className: string
}

export const GridCards: React.FC<Props> = ({ className, features, ...rest }) => {
  return <GridCardsBlockContainer className={className} {...rest}>
    {features.map(renderFeatured)}
  </GridCardsBlockContainer>
}

interface GridCardsBlockContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string
}

const GridCardsBlockContainer: React.FC<GridCardsBlockContainerProps> = ({ className, children, ...rest }) => {
  const featuredGridClass = (gridClassname: string) => classNames(
    '@container w-full grid gap-4 gap-4',
    gridClassname ?? 'grid-cols-1 md:grid-cols-4'
  );

  return <div className={featuredGridClass(className)} {...rest}>
    {children}
  </div>
}

