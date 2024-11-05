import React from 'react';
import classNames from 'classnames';

interface Args {
    text: string;
    color?: 'primary' | 'secondary';
    type?: 'fill' | 'line';
    className?: string;
    icon?: React.ReactNode;
}

export const MainButton = ({
    text,
    color = 'primary',
    type = 'fill',
    className = '',
    icon,
}: Args): JSX.Element => {
    const buttonClass = classNames(
        'px-4 py-1.5 rounded-generic flex justify-center items-center text-center font-body text-sm inline-flex min-w-24 max-w-52',
        className,
        {
            // Fill
            'bg-primary-900 text-white': type === 'fill' && color === 'primary',
            'bg-primary-300 text-white': type === 'fill' && color === 'secondary',
            // Line
            'border border-primary-900 text-primary-900': type === 'line' && color === 'primary',
            'border border-primary-300 text-primary-300': type === 'line' && color === 'secondary',
            // Icon
            'gap-1.5': icon,
        }
    );

    return (
        <div className={buttonClass}>
            {icon && <span className="icon-class">{icon}</span>}
            {text}
        </div>
    );
};