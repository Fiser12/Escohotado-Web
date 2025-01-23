import React from 'react';
import classNames from 'classnames';
import { ArrowLinkIcon } from '../icons/arrow_link';

interface Props {
    text: string;
    href: string;
    className?: string;
}

export const Link: React.FC<Props> = ({
    text,
    href,
    className,
}) => {
    const linkClass = classNames(
        'w-auto font-normal font-body text-sm text-primary-400 flex flex-row justify-end gap-1 items-center',
        className,
    );

    return (
        <a href={href} className='hover: cursor-pointer'>
            <div className={linkClass}>
                {text}
                <ArrowLinkIcon />
            </div>
        </a>
    );
};
