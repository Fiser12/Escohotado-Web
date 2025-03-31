import classNames from 'classnames';
import React, { ComponentType } from 'react';
import { JSX } from 'react';

export type TypographyProps = {
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

export const Typo = {
    H1: createTypography('h1', 'text-primary-900 text-4xl md:text-6xl font-regular font-display leading-tight'),
    H2: createTypography('h2', 'text-primary-900 text-3xl md:text-5xl font-regular font-display'),
    H3: createTypography('h3', 'text-black text-2xl font-regular font-display'),
    H4: createTypography('h4', 'text-black text-lg md:text-xl font-normal font-body'),
};
