import classNames from "classnames";
import { H3 } from "../../../common/headers/H3";
import { ImageParallax } from "../../book/cards/image_parallax";
import Image from "next/image";

interface Props {
      title: string;
      quote: string;
      author: string;
      coverHref: string;
      className?: string;
}

export const FeaturedBook = (props: Props) => {
      const containerClass = classNames(
            props.className,
            'w-full h-full p-8 bg-white rounded p-4 flex flex-col gap-6 justify-center items-center'
      );

      const contentClass = classNames(
            'w-full text-center flex flex-col gap-2'
      );

      return (
            <div className={containerClass}>
                  <ImageParallax shadow={false} className="relative h-[260px] w-[160px]">
                        <Image
                              fill
                              src={props.coverHref}
                              alt={props.title}
                              className="object-cover"
                        />
                  </ImageParallax>
                  <div className={contentClass}>
                        <H3 label={props.title} />
                        <p>{props.quote}</p>
                        <p className="text-primary-400 text-sm">{props.author}</p>
                  </div>
            </div>
      );
};