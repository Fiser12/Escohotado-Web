"use client";

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import classNames from 'classnames';
import { BookCard } from '../cards';
import { ContentWrapper } from '../../../layout/content_wrapper/content_wrapper';
import { NextButton, PrevButton, usePrevNextButtons } from './carousel-arrow';
import "./styles.css";
import { Book } from "payload-types"
import { routes } from '@/core/routesGenerator';
import { COLLECTION_SLUG_BOOK } from '@/core/collectionsSlugs';
import { Typo } from '@/components/common/typographies/Typographies';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  books: Array<Book>;
}

export const CarouselBook: React.FC<Props> = ({ className, title, books: booksParam, ...rest }) => {
  const books = booksParam.map((book) => ({
    title: book.title,
    coverHref: typeof book.cover === "number" ? "" : book.cover.url,
    link: routes.nextJS.generateDetailHref({ collection: COLLECTION_SLUG_BOOK, value: book })
  }))

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false },
    [Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })]
  )
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const carouselClass = classNames(
    'overflow-hidden h-full'
  );

  const containerClass = classNames(
    'flex items-start max-h-90 md:max-h-120 pt-5 md:pt-8'
  );
  const divClass = classNames(
    "ignore-wrapper pb-10 pt-10",
    className
  );

  return (
    <div className={divClass} {...rest}>
      <ContentWrapper>
        <div className="flex justify-between items-center">
          <Typo.H2 className='w-full'>{title}</Typo.H2>
          <div className="grid grid-cols-2 gap-[0.6rem] items-center">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </ContentWrapper>
      <div className={carouselClass} ref={emblaRef}>
        <div className={containerClass}>
          {books.map((book, index) => (
            <div key={index} className="flex-none w-[60%] sm:w-[50%] md:w-[30%] xl:w-[20%] 2xl:w-[14%]">
              <BookCard title={book.title} coverHref={book.coverHref ?? "/"} link={book.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
