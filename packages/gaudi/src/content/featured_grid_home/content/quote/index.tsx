import classNames from "classnames";

interface Props {
      quote: string;
      author: string;
      className?: string;
}

export const FeaturedQuote = (props: Props) => {
      const containerClass = classNames(
            props.className,
            'bg-primary-100 w-full h-full max-h-[300px] flex flex-col gap-5 justify-center p-5'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl line-clamp-6'
      );

      const authorClass = classNames(
            'text-black font-bold text-sm'
      );

      return (
            <div className={containerClass}>
                  <p className={quoteClass}>{props.quote}</p>
                  <p className={authorClass}>{props.author}</p>
            </div>
      );
};