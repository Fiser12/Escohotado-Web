import React from 'react';
import classNames from 'classnames';
import { InputForm } from '../input';

interface Props {
    label: string;
    text?: string;
    placeholder: string;
    error?: string;
    icon?: React.ReactNode;
    state?: 'enabled' | 'disabled';
    className?: string;
}

export const TextField = (props: Props) => {
    const textFieldClass = classNames(
        'font-body flex flex-col gap-2 max-w-72',
        props.className,
    );

    const labelClass = classNames(
        'text-primary-900 text-sm font-bold',
        props.className,
    );

    const iconClass = classNames(
        'text-gray-dark flex-shrink-0 ml-2',
        props.className,
    );

    const errorClass = classNames(
        'text-red-500 text-xs',
        props.className,
    );

    return (
        <div className={textFieldClass}>
            <label className={labelClass}>{props.label}</label>
            <InputForm
                label={props.label}
                text={props.text}
                placeholder={props.placeholder}
                state={props.state}
                className='pr-2.5'
            >
                {props.icon && <span className={iconClass}>{props.icon}</span>}
            </InputForm>
            {props.error && <p className={errorClass}>{props.error}</p>}
        </div>
    );
};
