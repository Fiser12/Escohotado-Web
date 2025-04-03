"use client";

import { CloseXIcon } from "@/components/assets/icons";
import { Tag } from "@/components/atoms/tag";
import { Typo } from "@/components/atoms/typographies";
import { getAuthorFromTaxonomies, mapTaxonomyToCategoryModel } from "@/core/mappers/map-taxonomy-to-category-model";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Quote, Taxonomy } from "payload-types";
import React from "react";
import { AnimatedModal } from "../animated-modal";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: Quote;
  goBackTo?: string;
}

export const ModalQuote: React.FC<ModalProps> = ({
  children,
  quote,
  className,
  goBackTo,
  ...rest
}) => {
  const containerClass = classNames(
    className,
    "fixed inset-0 flex items-center justify-center z-[999]"
  );
  const taxonomies = quote.categories?.cast<Taxonomy>() ?? []
  const router = useRouter();
  const onCloseModal = () => {
    if (goBackTo) router.push(goBackTo);
    else router.back();
  }
  const categories = taxonomies.map(mapTaxonomyToCategoryModel)
  const author = getAuthorFromTaxonomies(taxonomies)?.singular_name ?? ""

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
              <Typo.QuoteBig className="dynamic-text-quote line-clamp-4">{quote.quote}</Typo.QuoteBig>
              {author && <Typo.PSmall className="text-m text-primary-900  font-display">- {author}</Typo.PSmall>}
              <div className="flex flex-row gap-2 flex-wrap">
                {categories.map((category, index) =>
                  <Tag key={index} text={category.label} isActive={false} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};
