import React from 'react';
import classNames from 'classnames';

interface Props {
    className?: string;
}

export const SearchBarLockIcon: React.FC<Props> = ({
    className
}) => {
    const iconClass = classNames(
        'stroke-current fill-current',
        className,
    );

    return (
        <svg
            viewBox="0 0 14 14"
            fill="none"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.2 5.79999H3.8C3.35818 5.79999 3 6.15816 3 6.59999V11.4C3 11.8418 3.35818 12.2 3.8 12.2H10.2C10.6418 12.2 11 11.8418 11 11.4V6.59999C11 6.15816 10.6418 5.79999 10.2 5.79999Z" />
            <path d="M9.8002 5.79999V4.59999C9.8002 3.85738 9.50524 3.14519 8.98009 2.62009C8.455 2.09499 7.7428 1.79999 7.0002 1.79999C6.25759 1.79999 5.5454 2.09499 5.0203 2.62009C4.4952 3.14519 4.2002 3.85738 4.2002 4.59999V5.79999" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};