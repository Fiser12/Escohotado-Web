import React from 'react';
import classNames from 'classnames';

interface Args {
    label: string;
    text?: string;
    placeholder: string;
    error?: string;
    icon?: React.ReactNode;
    state?: 'enabled' | 'disabled';
    className?: string;
}

export const TextField = ({
    label,
    text,
    placeholder,
    error,
    icon,
    state = 'enabled',
    className = '',
}: Args): JSX.Element => {
    const textFieldClass = classNames(
        'font-body flex flex-col gap-1 max-w-72',
        className,
    );

    const labelClass = classNames(
        'text-primary-900 text-sm font-bold',
        className,
    );

    const containerClass = classNames(
        'py-1.5 px-4 flex items-center bg-white rounded border-solid font-normal text-base h-10',
        className,
        {
            // Enabled
            'border border-primary-900': state === 'enabled',
            // Disabled
            'border-0.5 border-gray-disabled': state === 'disabled',
        }
    );

    const inputClass = classNames(
        'grow min-w-0 bg-transparent outline-none placeholder-gray-500 placeholder-gray-disabled',
        className,
    );

    const iconClass = classNames(
        'text-gray-dark flex-shrink-0 ml-2',
        className,
    );

    const errorClass = classNames(
        'text-red-500 text-xs',
        className,
    );

    return (
        <div className={textFieldClass}>
            <label className={labelClass}>{label}</label>
            <div className={containerClass}>
                <input
                    type="text"
                    placeholder={placeholder}
                    defaultValue={text}
                    disabled={state === 'disabled'}
                    className={inputClass} // Añade la clase inputClass al input
                />
                {icon && <span className={iconClass}>{icon}</span>}
            </div>
            {error && <p className={errorClass}>{error}</p>}
        </div>
    );
};
