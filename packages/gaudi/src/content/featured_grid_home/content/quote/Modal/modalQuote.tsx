"use client";
import React from "react";
import classNames from "classnames";
import { MainButton } from "../../../../../client";
import { CloseXIcon } from "../../../../../common/icons/closex_icon";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalQuote: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  ...rest
}) => {

  if (!isOpen) return null;

  const containerClass = classNames(
    className,
    "fixed inset-0 flex items-center justify-center z-[999]"
  );

  return (
    <div className={containerClass} {...rest}>
      <div
        className="fixed inset-0 bg-primary-900 opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 m-4 rounded shadow-m max-w-[37.5rem] relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4">
            <CloseXIcon className="w-7 text-primary-900" />
          </button>
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
