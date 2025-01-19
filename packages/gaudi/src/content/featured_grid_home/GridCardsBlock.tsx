import React from 'react'

import classNames from 'classnames'
import { Featured } from '../pages/home_page'
import { FeaturedArticle } from './content/article'
import { FeaturedQuote } from './content/quote'
import { FeaturedBook } from './content/book'
import { FeaturedVideo } from './content/video'

interface Props { 
  features: Featured[]
  gridClassname: string 
}

const renderFeatured = (item: Featured) => {
  switch (item.type) {
    case "article":
      return (
        <FeaturedArticle
          key={item.id}
          className={item.className}
          title={item.title}
          hasPermission={item.hasPermission}
          author={item.author}
          coverHref={item.coverHref}
          href={item.href}
          categories={item.categories}
        />
      );
    case "quote":
      return (
        <FeaturedQuote
          key={item.id}
          className={item.className}
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
          coverHref={item.coverHref}
          href={item.href}
          categories={item.categories}
        />
      );
    default:
      return null;
  }
};


export const GridCardsBlock: React.FC<Props> = (props) => {
  const featuredGridClass = (gridClassname: string) => classNames(
    '@container w-full grid gap-4 gap-4',
    gridClassname ?? 'grid-cols-1 md:grid-cols-4'
  );

  return <div className={featuredGridClass(props.gridClassname)}>
    {props.features.map(renderFeatured)}
  </div>
}

