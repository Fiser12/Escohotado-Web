import React from 'react';
import classNames from 'classnames';

interface Props {
    className?: string;
    color?: 'default' | 'primary' | 'secondary';
}

export const UserIcon: React.FC<Props> = ({
    className = '',
    color = 'default',
}) => {
    const iconClass = classNames(
        'h-4',
        className,
        {
            'text-white': color === 'default',
            'text-primary-900': color === 'primary',
            'text-primary-300': color === 'secondary',
        }
    );

    return (
        <svg
            className={iconClass}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M7 12.2C9.87188 12.2 12.2 9.87188 12.2 7C12.2 4.12812 9.87188 1.8 7 1.8C4.12812 1.8 1.8 4.12812 1.8 7C1.8 9.87188 4.12812 12.2 7 12.2ZM7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M3.03125 11.4998C3.2774 9.52673 4.96054 8 7.00028 8C9.03999 8 10.7231 9.5267 10.9693 11.4997C9.91155 12.4334 8.52206 13 7.00024 13C5.47845 13 4.08898 12.4335 3.03125 11.4998Z" fill="currentColor" />
            <circle cx="7" cy="5" r="2" fill="currentColor" />
        </svg>
    );
};
