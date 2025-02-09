"use client";

import React from "react";
import classNames from "classnames";
import { CloseXIcon } from "../../../../../common/icons/closex_icon";
import { Tag } from "../../../../../common/tag/tag";
import { CategoryModel } from "hegel";
import { useRouter } from "next/navigation";
import { AnimatedModal } from "../../../../../common/animated-modal";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  categories: CategoryModel[];
  goBackTo?: string;
  onCloseModal: () => void;
}

export const ModalQuote: React.FC<ModalProps> = ({
  children,
  quote,
  author,
  categories,
  className,
  goBackTo,
  onCloseModal,
  ...rest
}) => {
  const containerClass = classNames(
    className,
    "fixed inset-0 flex items-center justify-center z-[999]"
  );
  return (
    <AnimatedModal 
      onClose={onCloseModal} 
      className={containerClass} 
      {...rest}
      modalContent={(setIsClosed) => (
        <div className="bg-white p-4 m-4 rounded shadow-m max-w-[37.5rem] relative z-10 shadow-md">
          <button
            onClick={setIsClosed}
            className="absolute top-4 right-4">
            <CloseXIcon className="w-7 text-primary-900" />
          </button>
          <div className="w-full h-full">
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
          </div>
        </div>
      )}
    />
  );
};
