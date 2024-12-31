"use client";

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import classNames from 'classnames';
import { BookCard } from '../cards';
import { H2 } from '../../../common/headers/H2';
import { ContentWrapper } from '../../../common/content_wrapper/content_wrapper';

interface Props {
  books: Array<{
    title: string;
    coverHref: string;
    link: string;
  }>;
}

export const CarouselBook = (props: Props) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: false },
    [Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false, 
      stopOnMouseEnter: true,
    })]
  )

  const carouselClass = classNames(
    'overflow-hidden h-full'
  );

  const containerClass = classNames(
    'flex items-start max-h-90 md:max-h-120 pt-5 md:pt-8'
  );

  return (
    <div className='w-full flex flex-col pb-5'>
      <ContentWrapper>
        <H2 label='Biblioteca'/>
      </ContentWrapper>
      <div className={carouselClass} ref={emblaRef}>
        <div className={containerClass}>
            {props.books.map((book, index) => (
              <div key={index} className="flex-none w-[50%] md:w-[30%] xl:w-[20%] 2xl:w-[14%]">
                <BookCard title={book.title} coverHref={book.coverHref} link={book.link} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
