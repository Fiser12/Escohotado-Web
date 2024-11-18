import React from 'react';
import classNames from 'classnames';

interface Args {
    text: string;
    className?: string;
    variant?: 'light' | 'primary';
    key?: React.Key;
}

export const Tag = ({
    text,
    variant = 'primary',
    className = '',
    key,
}: Args): JSX.Element => {
    const tagClass = classNames(
        'px-3 py-1 rounded-generic flex justify-center items-center text-center font-body text-xs inline-flex min-w-14 text-primary-900',
        className,
        {
            'bg-white': variant === 'light',
            'bg-primary-50': variant === 'primary',
        }
    );

    return (
        <div key={key} className={tagClass}>
            {text}
        </div>
    );
};