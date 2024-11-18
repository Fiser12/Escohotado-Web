import React from 'react';
import classNames from 'classnames';
import { ArrowLinkIcon } from '../icons/arrow_link';

interface Args {
    text: string;
    href: string;
    className?: string;
}

export const Link = ({
    text,
    href,
    className,
}: Args): JSX.Element => {
    const linkClass = classNames(
        'font-normal font-body text-sm text-primary-400 flex flex-row-reverse gap-1 items-center',
        className,
    );

    return(
        <a href={href}>
            <div className={linkClass}>
                <ArrowLinkIcon></ArrowLinkIcon>
                {text}
            </div>
        </a>
    );
};
