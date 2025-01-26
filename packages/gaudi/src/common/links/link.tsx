import React from 'react';
import classNames from 'classnames';
import { ArrowLinkIcon } from '../icons/arrow_link';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
    text: string;
    href: string;
    className?: string;
}

export const Link: React.FC<Props> = ({
    text,
    className,
    ...rest
}) => {
    const linkClass = classNames(
        'w-auto font-normal font-body text-sm text-primary-400 flex flex-row justify-end gap-1 items-center',
        className,
    );

    return (
        <a {...rest} className='hover: cursor-pointer'>
            <div className={linkClass}>
                {text}
                <ArrowLinkIcon />
            </div>
        </a>
    );
};
