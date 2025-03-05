"use client"

import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { CategoryModel, OrigenModel } from "hegel";
import "./style.css";
import { ArrowLinkIcon } from "../../../../common/icons/arrow_link";
import { EyeIcon } from "../../../../common/icons/eye_icon";
import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      id: string;
      quote: string;
      author: string;
      origen?: OrigenModel | null;
      categories: CategoryModel[];
}

export const FeaturedQuote: React.FC<Props> = ({ 
      id,
      className, 
      quote, 
      author, 
      categories,
      origen, 
      ...rest 
}) => {

      const containerClass = classNames(
            className,
            'w-full h-full max-h-[21.875rem] flex flex-col px-5 justify-between'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl'
      );

      return (
            <div className={`base-container-axis-quote ${containerClass}`} {...rest}>
                  {origen &&
                        <a href={origen.hasPermissions ? origen.detailHref : undefined} className="group w-full flex flex-row justify-between items-center hover:text-white text-primary-900 transition-colors duration-300 ease-in-out py-3">
                              <p className="font-display">{origen.title}</p>
                              <ArrowLinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                  }
                  <div className="h-full flex items-center">
                        <p className={`dynamic-text-quote ${quoteClass} line-clamp-4`}>{quote}</p>
                  </div>
                  <div className="w-full flex justify-between items-center mb-4">
                        <div className="flex flex-row gap-2 flex-wrap">
                              {categories.map((category, index) =>
                                    <Tag key={index} text={category.label} isActive={true} />
                              )}
                        </div>
                        <Link href={`/cita/${id}`}>
                              <div className="bg-white p-1 rounded-full">
                                    <EyeIcon className="w-6 text-primary-900" />
                              </div>
                        </Link>
                  </div>
            </div>
      );
};