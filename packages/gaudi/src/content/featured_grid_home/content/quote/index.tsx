import classNames from "classnames";
import "./style.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      quote: string;
      author: string;
}

export const FeaturedQuote: React.FC<Props> = ({ className, quote, author, ...rest }) => {
      const containerClass = classNames(
            className,
            'bg-primary-100 w-full h-full max-h-[350px] flex flex-col gap-5 justify-center px-5 py-8'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl line-clamp-5'
      );

      const authorClass = classNames(
            'text-black font-bold text-sm'
      );

      return (
            <>
                  <div className={`base-container-axis-quote ${containerClass}`} {...rest}>
                        <p className={`dynamic-text-quote ${quoteClass}`}>{quote}</p>
                        <p className={authorClass}>{author}</p>
                  </div>
                  <svg width="0" height="0">
                        <defs>
                              <filter id="roughpaper">
                                    <feTurbulence type="fractalNoise" baseFrequency=".3" numOctaves="20" result="noise" />
                                    <feDiffuseLighting lightingColor="#B0CFDB" diffuseConstant="1" surfaceScale=".5" result="diffLight">
                                          <feDistantLight azimuth="10" elevation="50" />
                                    </feDiffuseLighting>
                              </filter>
                        </defs>
                  </svg>
            </>
      );
};