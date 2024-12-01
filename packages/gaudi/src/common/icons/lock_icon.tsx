import React from 'react';
import classNames from 'classnames';

interface Args {
    className?: string;
}

export const LockIcon = ({
    className = '',
}: Args): JSX.Element => {
    const iconClass = classNames(
        'h-[48px]',
        className,
    );

    return(
        <svg
            viewBox="0 0 48 47" 
            className={iconClass}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="24" cy="23.6711" r="23.0148" fill="white"/>
            <g clipPath="url(#clip0_683_1862)">
            <path d="M30.4569 21.2496H17.543C16.6515 21.2496 15.9288 21.9724 15.9288 22.8639V32.5493C15.9288 33.4408 16.6515 34.1635 17.543 34.1635H30.4569C31.3485 34.1635 32.0712 33.4408 32.0712 32.5493V22.8639C32.0712 21.9724 31.3485 21.2496 30.4569 21.2496Z" stroke="#C2C2C2" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M29.6498 21.2497V18.8283C29.6498 17.3299 29.0546 15.8928 27.995 14.8333C26.9355 13.7737 25.4984 13.1785 24 13.1785C22.5015 13.1785 21.0645 13.7737 20.005 14.8333C18.9454 15.8928 18.3501 17.3299 18.3501 18.8283V21.2497" stroke="#C2C2C2" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 28.5137C24.4457 28.5137 24.8071 28.1523 24.8071 27.7065C24.8071 27.2608 24.4457 26.8994 24 26.8994C23.5542 26.8994 23.1929 27.2608 23.1929 27.7065C23.1929 28.1523 23.5542 28.5137 24 28.5137Z" stroke="#C2C2C2" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_683_1862">
            <rect width="22.5993" height="22.5993" fill="white" transform="translate(12.7003 12.3713)"/>
            </clipPath>
            </defs>
        </svg>
    );
};
