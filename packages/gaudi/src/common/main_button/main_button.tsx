import React from 'react';
import classNames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    color?: 'primary' | 'secondary';
    type?: 'fill' | 'line';
    className?: string;
    icon?: React.ReactNode;
}

export const MainButton: React.FC<Props> = ({
    text,
    color = 'primary',
    type = 'fill',
    className,
    icon,
    ...rest
}) => {
    const buttonClass = classNames(
        'px-4 py-1.5 rounded flex justify-center items-center text-center font-body text-sm inline-flex min-w-24 max-w-52 cursor-pointer',
        className,
        {
            // Fill
            'border border-primary-900 bg-primary-900 text-white': type === 'fill' && color === 'primary',
            'border border-primary-300 bg-primary-300 text-white': type === 'fill' && color === 'secondary',
            // Line
            'border border-primary-900 text-primary-900': type === 'line' && color === 'primary',
            'border border-primary-300 text-primary-300': type === 'line' && color === 'secondary',
            // Icon
            'gap-1.5': icon,
        }
    );

    const iconClass = classNames(
        className,
        {
            'text-white': type === 'fill',
            'text-primary-900': type === 'line' && color === 'primary',
            'text-primary-300': type === 'line' && color === 'secondary',
        }
    );

    return (
        <div className={buttonClass} {...rest}>
            {icon && <span className={iconClass}>{icon}</span>}
            {text}
        </div>
    );
};