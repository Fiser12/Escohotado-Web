import classNames from "classnames";
import { H3 } from "../../../common/headers/H3";
import { ImageParallax } from "../../book/cards/image_parallax";

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
            'w-full h-full p-6 bg-white rounded p-4 flex flex-col gap-4 justify-center items-center'
      );

      const contentClass = classNames(
            'w-full text-center flex flex-col gap-2'
      );

      return (
            <div className={containerClass}>
                  <ImageParallax shadow={false} className="w-auto h-full py-2">
                        <img
                              src={props.coverHref}
                              alt={props.title}
                              className="w-auto max-h-[300px]"
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