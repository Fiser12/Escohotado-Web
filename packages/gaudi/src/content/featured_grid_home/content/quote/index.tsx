import classNames from "classnames";
import "./style.css";

interface Props {
      quote: string;
      author: string;
      className?: string;
}

export const FeaturedQuote = (props: Props) => {
      const containerClass = classNames(
            props.className,
            'bg-primary-100 w-full h-full max-h-[350px] flex flex-col gap-5 justify-center px-5 py-8'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl line-clamp-5'
      );

      const authorClass = classNames(
            'text-black font-bold text-sm'
      );

      return (
            <div className={`base-container-axis-quote ${containerClass}`}>
                  <p className={`dynamic-text-quote ${quoteClass}`}>{props.quote}</p>
                  <p className={authorClass}>{props.author}</p>
            </div>
      );
};