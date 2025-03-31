"use client"

import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { CategoryModel, OrigenModel } from "hegel";
import "./style.css";
import Link from "next/link";
import { ArrowLinkIcon, EyeIcon } from "@/components/assets/icons";
import { Typo } from "@/components/common/typographies/Typographies";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      itemId: number;
      quote: string;
      author: string;
      origen?: OrigenModel | null;
      categories: CategoryModel[];
}

export const QuoteCard: React.FC<Props> = ({
      itemId,
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

      return (
            <div className={`base-container-axis-quote ${containerClass}`} {...rest}>
                  {origen &&
                        <a href={origen.hasPermissions ? origen.detailHref : undefined} className="group w-full flex flex-row justify-between items-center hover:text-white text-primary-900 transition-colors duration-300 ease-in-out py-3">
                              <Typo.P>{origen.title}</Typo.P>
                              <ArrowLinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                  }
                  <div className="h-full flex items-center">
                        <Typo.QuoteSmall className="dynamic-text-quote line-clamp-4">{quote}</Typo.QuoteSmall>
                  </div>
                  <div className="w-full flex justify-between items-center mb-4">
                        <div className="flex flex-row gap-2 flex-wrap">
                              {categories.map((category, index) =>
                                    <Tag key={index} text={category.label} isActive={true} />
                              )}
                        </div>
                        <Link href={`/cita/${itemId}`}>
                              <div className="bg-white p-1 rounded-full">
                                    <EyeIcon className="w-6 text-primary-900" />
                              </div>
                        </Link>
                  </div>
            </div>
      );
};