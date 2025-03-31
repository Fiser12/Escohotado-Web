import React, { JSX, ComponentType } from "react";
import classNames from "classnames";

export interface TypographyProps {
  className?: string;
  children: React.ReactNode;
  blackMode?: boolean;
};

export const createTypography = (
  tag: keyof JSX.IntrinsicElements,
  baseClass: string
): ComponentType<TypographyProps> => {
  const Typography = ({ className, children, blackMode }: TypographyProps) =>
    React.createElement(
      tag,
      {
        className: classNames(
          baseClass,
          blackMode ? "text-white" : "text-black",
          className
        ),
      },
      children
    );

  Typography.displayName = `Typography${tag.toUpperCase()}`;
  return Typography;
};
