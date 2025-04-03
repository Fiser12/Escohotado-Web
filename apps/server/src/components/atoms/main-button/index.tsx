import React from 'react';
import classNames from 'classnames';
import { classMerge } from 'hegel/react';
import Link from 'next/link';
import './style.css'

export interface Action {
    link?: {
        target?: string
        href: string
    }
    tabIndex?: number
    onClick?: () => Promise<void>
}


export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    color?: 'primary' | 'secondary';
    type?: 'fill' | 'line';
    className?: string;
    icon?: React.ReactNode;
}
export type MainButtonActionProps = Action & ButtonProps

export const MainButtonAction: React.FC<MainButtonActionProps> = ({
    link,
    tabIndex,
    onClick,
    ...rest
}) => {
    if (link) {
        return <Link href={link.href} target={link.target} tabIndex={tabIndex}>
            <MainButton {...rest} />
        </Link>
    }
    return <MainButton {...rest} onClick={onClick} tabIndex={tabIndex} />
}

export const MainButton: React.FC<ButtonProps> = ({
    text,
    color = 'primary',
    type = 'fill',
    className,
    icon,
    ...rest
}) => {
    const buttonClass = classMerge(
        'px-4 py-1.5 rounded flex justify-center items-center font-body text-sm inline-flex min-w-24 max-w-58 cursor-pointer transition duration-300 hover:-translate-y-1 motion-reduce:hover:transform-none',
        className,
        {
            // Fill
            'border border-primary-900 bg-primary-900 text-white hover:bg-black': type === 'fill' && color === 'primary',
            'border border-primary-300 bg-primary-300 text-white hover:bg-primary-400': type === 'fill' && color === 'secondary',
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
            <div className='flex items-center gap-1.5'>
                {icon && <span className={iconClass}>{icon}</span>}
                {text}
            </div>
        </div>
    );
};