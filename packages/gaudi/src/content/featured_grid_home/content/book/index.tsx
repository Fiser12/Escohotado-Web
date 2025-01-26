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
      const containerClass = classNames(className, 'w-full h-full gap-6 px-4 py-6');
      const containerImageClass = classNames('object-cover');
      const contentClass = classNames('w-full flex flex-col justify-center items-center gap-2');
      const titleClass = classNames("w-full line-clamp-3 font-display");

      return (
            <BaseCardContainer className={`base-container-axis-book ${className}`} href={detailHref} {...rest}>
                  <div className={`grid-axis-control-content-book ${containerClass}`}>
                        <ImageParallax shadow={false} className="w-full aspect-[2/3]">
                              <Image
                                    width={400}
                                    height={600}
                                    layout="responsive"
                                    src={coverHref}
                                    alt={title}

                                    className={containerImageClass}
                              />
                        </ImageParallax>
                        <div className={contentClass}>
                              <p className={`dynamic-text-book ${titleClass}`}>{title}</p>
                              <p className="w-full text-book-quote">{quote}</p>
                              <p className="text-primary-400 text-sm w-full">{author}</p>
                        </div>
                  </div>
            </BaseCardContainer>
      );
};