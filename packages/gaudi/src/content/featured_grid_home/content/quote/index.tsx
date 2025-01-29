import classNames from "classnames";
import "./style.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      quote: string;
      author: string;
}

export const FeaturedQuote: React.FC<Props> = ({ className, quote, author, ...rest }) => {
      const containerClass = classNames(
            className,
            'w-full h-full max-h-[350px] flex flex-col gap-5 justify-center px-5 py-8'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl line-clamp-5'
      );

      const authorClass = classNames(
            'text-black font-bold text-sm'
      );

      return (<div className={`base-container-axis-quote ${containerClass}`} {...rest}>
            <p className={`dynamic-text-quote ${quoteClass}`}>{quote}</p>
            <p className={authorClass}>{author}</p>
      </div>);
};