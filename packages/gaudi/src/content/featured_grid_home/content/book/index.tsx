import classNames from "classnames";
import { ImageParallax } from "../../../book/cards/image_parallax";
import Image from "next/image";
import { BaseCardContainer } from "../../container_base";
import "./style.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      title: string;
      quote: string;
      author: string;
      detailHref: string;
      coverHref: string;
      className?: string;
}

export const FeaturedBook: React.FC<Props> = ({className, detailHref, coverHref, title, quote, author, ...rest}) => {
      const containerClass = classNames(className, 'w-full h-full px-4 py-6');
      const containerImageClass = classNames('w-full aspect-[2/3] mx-auto');
      const ImageClass = classNames('object-cover');
      const contentClass = classNames('w-full flex flex-col justify-center items-center gap-2');
      const titleClass = classNames("w-full line-clamp-3 font-display");

      return (
            <BaseCardContainer className={`base-container-axis-book ${className}`} href={detailHref} {...rest}>
                  <div className={`${containerClass} grid-axis-control-content-book`}>
                        <ImageParallax shadow={false} className={`${containerImageClass} image-size-book`}>
                              <Image
                                    width={400}
                                    height={600}
                                    layout="responsive"
                                    src={coverHref}
                                    alt={title}
                                    className={ImageClass}
                              />
                        </ImageParallax>
                        <div className={contentClass}>
                              <p className={`${titleClass} dynamic-text-book`}>{title}</p>
                              <p className="w-full text-book-quote">{quote}</p>
                              <p className="text-primary-400 text-sm w-full">{author}</p>
                        </div>
                  </div>
            </BaseCardContainer>
      );
};