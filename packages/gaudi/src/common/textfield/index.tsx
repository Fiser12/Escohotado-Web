import React from 'react';
import classNames from 'classnames';
import { InputForm } from '../input';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
    label: string;
    text?: string;
    placeholder: string;
    error?: string;
    icon?: React.ReactNode;
    state?: 'enabled' | 'disabled';
}

export const TextField: React.FC<Props> = ({className, label, text, placeholder, state, icon, error}) => {
    const textFieldClass = classNames(
        'font-body flex flex-col gap-2 max-w-72',
        className,
    );

    const labelClass = classNames(
        'text-primary-900 text-sm font-bold',
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
            <InputForm
                type='text'
                label={label}
                text={text}
                placeholder={placeholder}
                state={state}
                className='w-full pr-2.5'
            >
                {icon && <span className={iconClass}>{icon}</span>}
            </InputForm>
            {error && <p className={errorClass}>{error}</p>}
        </div>
    );
};
