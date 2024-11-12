import React from 'react';
import classNames from 'classnames';

interface Args {
    className?: string;
}

export const EmailIcon = ({
    className = '',
}: Args): JSX.Element => {
    const iconClass = classNames(
        'h-4 stroke-current',
        className,
    );

    return (
        <svg
            viewBox="0 0 14 14"
            fill="none"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 'auto', aspectRatio: '1' }}
        >
            <path
                d="M11.9357 2.33331H2.06394C1.5683 2.33331 1.1665 2.73511 1.1665 3.23075V10.859C1.1665 11.3546 1.5683 11.7564 2.06394 11.7564H11.9357C12.4314 11.7564 12.8332 11.3546 12.8332 10.859V3.23075C12.8332 2.73511 12.4314 2.33331 11.9357 2.33331Z"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.1665 3.45499L6.42548 6.61777C6.58674 6.71244 6.78997 6.76428 6.99984 6.76428C7.2097 6.76428 7.41294 6.71244 7.5742 6.61777L12.8332 3.45499"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
