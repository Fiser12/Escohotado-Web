"use client"
import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { CategoryModel, OrigenModel } from "hegel";
import "./style.css";
import { useEffect, useRef, useState } from "react";

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
            'w-full h-full max-h-[350px] flex flex-col gap-5 px-5 py-8 justify-between'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl line-clamp-6'
      );

      return (<div className={`base-container-axis-quote ${containerClass}`} {...rest}>
            <div className="relative">
                  <p ref={textRef} className={`dynamic-text-quote ${quoteClass}`}>{quote}</p>
                  { isOverflowing &&  <Tag text={"Ver más"} variant="light" className="absolute right-0"/> }
            </div>
            <div className="flex flex-col gap-2">
                  { origen && <div className="flex flex-row">
                        <Tag text={origen.title} variant="primary" href={origen.hasPermissions ? origen.detailHref : undefined}/>
                  </div>}
                  <div className="flex flex-row gap-2 flex-wrap">
                        { categories.map((category, index) => 
                              <Tag key={index} text={category.label} variant="disabled"/>
                        )}
                  </div>
            </div>
      </div>);
};