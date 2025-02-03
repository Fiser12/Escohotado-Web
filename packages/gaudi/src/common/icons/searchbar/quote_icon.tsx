import React from 'react';
import classNames from 'classnames';

interface Props {
    className?: string;
}

export const SearchBarQuoteIcon: React.FC<Props> = ({
    className
}) => {
    const iconClass = classNames(
        'h-4 stroke-current',
        className,
    );

    return (
        <svg
            viewBox="0 0 14 14"
            fill="none"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_941_1710)">
                <path d="M7 1H3.18182C2.60317 1 2.04821 1.22987 1.63904 1.63904C1.22987 2.04821 1 2.60317 1 3.18182V10.8182C1 11.3968 1.22987 11.9517 1.63904 12.3609C2.04821 12.7701 2.60317 13 3.18182 13H10.8182C11.3968 13 11.9517 12.7701 12.3609 12.3609C12.7701 11.9517 13 11.3968 13 10.8182V7" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.98804 8.51497L4.98438 9.05563L5.48499 6.01192L10.2208 1.29616C10.3138 1.20232 10.4246 1.12783 10.5466 1.077C10.6686 1.02617 10.7994 1 10.9317 1C11.0638 1 11.1947 1.02617 11.3166 1.077C11.4387 1.12783 11.5494 1.20232 11.6425 1.29616L12.7038 2.35745C12.7977 2.45053 12.8721 2.56127 12.923 2.68328C12.9738 2.80528 13 2.93615 13 3.06832C13 3.20049 12.9738 3.33136 12.923 3.45337C12.8721 3.57538 12.7977 3.68612 12.7038 3.77919L7.98804 8.51497Z" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_941_1710">
                    <rect width="14" height="14" fill="currentColor" />
                </clipPath>
            </defs>
        </svg>
    );
};