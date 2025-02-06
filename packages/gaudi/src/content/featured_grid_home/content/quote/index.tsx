"use client"
import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { CategoryModel, OrigenModel } from "hegel";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import { ArrowLinkIcon } from "../../../../common/icons/arrow_link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      quote: string;
      author: string;
      origen?: OrigenModel | null;
      categories: CategoryModel[];
}

export const FeaturedQuote: React.FC<Props> = ({ className, quote, author, categories, origen, ...rest }) => {
      const [isOverflowing, setIsOverflowing] = useState(false);
      const textRef = useRef<HTMLParagraphElement>(null);
      useEffect(() => {
            const checkOverflow = () => {
                  if (textRef.current) {
                        setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
                  }
            };
            checkOverflow();
            window.addEventListener("resize", checkOverflow);
            return () => window.removeEventListener("resize", checkOverflow);
      }, [quote]);

      const containerClass = classNames(
            className,
            'w-full h-full max-h-[350px] flex flex-col px-5 justify-between'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl line-clamp-4'
      );

      return (
            <div className={`base-container-axis-quote ${containerClass}`} {...rest}>
                  {origen &&
                        <a href={origen.hasPermissions ? origen.detailHref : undefined} className="group w-full flex flex-row justify-between items-center hover:text-white text-primary-900 transition-colors duration-300 ease-in-out py-3">
                              <p className="font-display">{origen.title}</p>
                              <ArrowLinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                  }
                  <div className="flex flex-col gap-2 pb-4">
                        <div className="h-full flex flex-col items-end gap-3">
                              <p ref={textRef} className={`dynamic-text-quote ${quoteClass}`}>{quote}</p>
                              {isOverflowing && <Tag text={"+ Ver"} variant="light" />}
                        </div>
                        <div className="flex flex-row gap-2 flex-wrap">
                              {categories.map((category, index) =>
                                    <Tag key={index} text={category.label} variant="disabled" />
                              )}
                        </div>
                  </div>
            </div>
      );
};