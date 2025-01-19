import React from 'react';
import classNames from 'classnames';

interface Args {
    className?: string;
}

export const LockIcon = ({
    className = '',
}: Args): JSX.Element => {
    const iconClass = classNames(
        className,
    );

    return (
        <svg
            viewBox="0 0 23 24"
            className={iconClass}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_915_1659)">
                <path d="M17.7817 9.65112H4.86778C3.97627 9.65112 3.25354 10.3738 3.25354 11.2654V20.9508C3.25354 21.8423 3.97627 22.565 4.86778 22.565H17.7817C18.6732 22.565 19.3959 21.8423 19.3959 20.9508V11.2654C19.3959 10.3738 18.6732 9.65112 17.7817 9.65112Z" stroke="currentColor" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.9746 9.65127V7.22991C16.9746 5.73148 16.3794 4.29442 15.3198 3.23488C14.2602 2.17533 12.8232 1.58008 11.3247 1.58008C9.8263 1.58008 8.38924 2.17533 7.3297 3.23488C6.27015 4.29442 5.6749 5.73148 5.6749 7.22991V9.65127" stroke="currentColor" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.3247 16.9153C11.7705 16.9153 12.1318 16.5539 12.1318 16.1081C12.1318 15.6624 11.7705 15.301 11.3247 15.301C10.879 15.301 10.5176 15.6624 10.5176 16.1081C10.5176 16.5539 10.879 16.9153 11.3247 16.9153Z" stroke="currentColor" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_915_1659">
                    <rect width="22.5993" height="22.5993" fill="white" transform="translate(0.0250549 0.772949)" />
                </clipPath>
            </defs>
        </svg>
    );
};
