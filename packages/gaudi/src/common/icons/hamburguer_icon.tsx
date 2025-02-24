import React from 'react';
import classNames from 'classnames';

interface Props {
    className?: string;
}

export const HamburguerIcon: React.FC<Props> = ({
    className = '',
}) => {
    const iconClass = classNames(
        'h-6 stroke-current text-primary-900',
        className,
    );

    return (
        <svg
            viewBox="0 0 29 28"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="2.5" cy="3" r="2.5" />
            <circle cx="14.5" cy="3" r="2.5" />
            <circle cx="26.5" cy="3" r="2.5" />
            <circle cx="2.5" cy="14" r="2.5" />
            <circle cx="14.5" cy="14" r="2.5" />
            <circle cx="26.5" cy="14" r="2.5" />
            <circle cx="2.5" cy="25" r="2.5" />
            <circle cx="14.5" cy="25" r="2.5" />
            <circle cx="26.5" cy="25" r="2.5" />
        </svg>
    );
};
