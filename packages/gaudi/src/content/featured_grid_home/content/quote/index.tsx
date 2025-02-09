"use client"
import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { CategoryModel, OrigenModel } from "hegel";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import { ArrowLinkIcon } from "../../../../common/icons/arrow_link";
import { ModalQuote } from "./Modal/modalQuote";
import { MainButton } from "../../../../client";
import { CloseXIcon } from "../../../../common/icons/closex_icon";
import { EyeIcon } from "../../../../common/icons/eye_icon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      quote: string;
      author: string;
      origen?: OrigenModel | null;
      categories: CategoryModel[];
}

export const FeaturedQuote: React.FC<Props> = ({ className, quote, author, categories, origen, ...rest }) => {
      const [isOverflowing, setIsOverflowing] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);
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
                        <p ref={textRef} className={`dynamic-text-quote ${quoteClass} line-clamp-3`}>{quote}</p>
                  </div>
                  <div className="w-full flex justify-between items-center mb-4">
                        <div className="flex flex-row gap-2 flex-wrap">
                              {categories.map((category, index) =>
                                    <Tag key={index} text={category.label} variant="disabled" />
                              )}
                        </div>
                        {isOverflowing && <button onClick={() => setIsModalOpen(true)}>
                              <div className="bg-primary-500 p-1 rounded-full">
                                    <EyeIcon className="w-6 text-white" />
                              </div>
                        </button>
                        }
                  </div>
                  <ModalQuote isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div className="h-full flex flex-col justify-center gap-5 p-3">
                              <h2 className="text-m font-bold font-body text-gray-dark">Cita completa</h2>
                              <p className="font-handwritten text-2xl lg:text-xl">{quote}</p>
                              <p className="text-m text-primary-900  font-display">- {author}</p>
                              <div className="flex flex-row gap-2 flex-wrap">
                              {categories.map((category, index) =>
                                    <Tag key={index} text={category.label} variant="disabled" />
                              )}
                        </div>
                        </div>
                  </ModalQuote>
            </div>
      );
};