import React from 'react'

import classNames from 'classnames'
import { ContentCardModel, routes } from "hegel"
import { FeaturedArticle } from './content/article'
import { FeaturedQuote } from './content/quote'
import { FeaturedBook } from './content/book'
import { FeaturedVideo } from './content/video'
import { FeaturedMedia } from './content/media'

export const renderFeatured = (item: ContentCardModel) => {
  switch (item.type) {
    case "article":
      return (
        <FeaturedArticle
          key={item.id}
          className={item.className}
          title={item.title}
          isPdf={item.isPdf}
          hasPermission={item.hasPermission}
          author={item.author}
          coverHref={item.coverHref}
          href={item.detailHref}
          unlockHref={routes.subscriptionPageHref}
          categories={item.categories}
        />
      );
    case "quote":
      return (
        <FeaturedQuote
          key={item.id}
          origen={item.origen}
          className={item.className}
          categories={item.categories}
          quote={item.quote}
          author={item.author}
        />
      );
    case "book":
      return (
        <FeaturedBook
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
        <FeaturedVideo
          key={item.id}
          className={item.className}
          title={item.title}
          hasPermission={item.hasPermission}
          coverHref={item.coverHref}
          detailHref={item.detailHref}
          href={item.href ?? "https://placehold.co/error"}
          publishedAt={item.publishedAt}
          categories={item.categories}
          unlockHref={routes.subscriptionPageHref}
        />
      );
    case "media":
      return <FeaturedMedia
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

export const GridCardsBlock: React.FC<Props> = ({ className, features, ...rest }) => {
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

