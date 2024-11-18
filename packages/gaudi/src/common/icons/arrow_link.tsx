import React from 'react';
import classNames from 'classnames';

interface Args {
    className?: string;
}

export const ArrowLinkIcon = ({
    className = '',
}: Args): JSX.Element => {
    const iconClass = classNames(
        'h-4 stroke-current',
        className,
    );

    return (
        <svg
            viewBox="0 0 15 14"
            fill="none"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 'auto', aspectRatio: '1' }}
        >
            <path d="M1.66675 6.89355L13.3334 6.89355" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.56055 11.6665L13.3333 6.89378L8.56055 2.12105" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};