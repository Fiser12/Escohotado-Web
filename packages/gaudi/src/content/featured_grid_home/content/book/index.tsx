import classNames from "classnames";
import { H3 } from "../../../../common/headers/H3";
import { ImageParallax } from "../../../book/cards/image_parallax";
import Image from "next/image";
import { BaseCardContainer } from "../../container_base";

interface Props {
      title: string;
      quote: string;
      author: string;
      coverHref: string;
      className?: string;
}

export const FeaturedBook = (props: Props) => {
      const containerClass = classNames(props.className, 'w-full h-full gap-6 px-4 py-6');
      const containerImageClass = classNames('h-full w-auto mx-auto');
      const contentClass = classNames('w-full flex flex-col justify-center items-center gap-2');

      return (
            <>
                  <style>
                        {`
                              .base-container-axis-book {
                                    container-type: inline-size;
                              }
                              .grid-axis-control-content-book {
                                    display: flex;
                                    flex-direction: row;
                              }
                              @container (max-width: 300px) {
                                    .grid-axis-control-content-book {
                                          flex-direction: column;
                                          text-align: center;
                                    }
                              }
                        `}
                  </style>
                  <BaseCardContainer className={`base-container-axis-book ${props.className}`}>
                        <div className={`grid-axis-control-content-book ${containerClass}`}>
                              <ImageParallax shadow={false} className="w-auto h-full">
                                    <Image
                                          width={300}
                                          height={600}
                                          src={props.coverHref}
                                          alt={props.title}
                                          className={containerImageClass}
                                    />
                              </ImageParallax>
                              <div className={contentClass}>
                                    <H3 label={props.title} className="w-full" />
                                    <p className="w-full">{props.quote}</p>
                                    <p className="text-primary-400 text-sm w-full">{props.author}</p>
                              </div>
                        </div>
                  </BaseCardContainer>
            </>
      );
};