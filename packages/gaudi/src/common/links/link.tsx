import React from 'react';
import classNames from 'classnames';
import { ArrowLinkIcon } from '../icons/arrow_link';

interface Args {
    text: string;
    href: string;
}

export const Link = (args: Args) => {
    return(
        <a href={args.href}>
            <div className='font-normal font-body text-sm text-primary-400 flex flex-row gap-1 items-center'>
                {args.text}
                <ArrowLinkIcon></ArrowLinkIcon>
            </div>
        </a>
    );
};
