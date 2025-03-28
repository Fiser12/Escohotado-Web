import React from 'react';
import classNames from 'classnames';

interface Props {
    className?: string;
}

export const VideoIcon: React.FC<Props> = ({
    className
}) => {
    const iconClass = classNames(
        'stroke-current',
        className,
    );

    return (
        <svg
            viewBox="0 0 14 14"
            fill="none"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_941_1709)">
                <path d="M12.0769 1H1.92308C1.41328 1 1 1.41328 1 1.92308V12.0769C1 12.5867 1.41328 13 1.92308 13H12.0769C12.5867 13 13 12.5867 13 12.0769V1.92308C13 1.41328 12.5867 1 12.0769 1Z" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.22998 9.23006V4.91006C5.23036 4.83778 5.24983 4.76689 5.28644 4.70456C5.32305 4.64223 5.37548 4.59069 5.43842 4.55516C5.50137 4.51963 5.57258 4.50137 5.64486 4.50223C5.71714 4.50309 5.7879 4.52304 5.84998 4.56006L9.54998 6.71006C9.61228 6.74606 9.664 6.79781 9.69996 6.86013C9.73593 6.92244 9.75486 6.99312 9.75486 7.06506C9.75486 7.13701 9.73593 7.20769 9.69996 7.27C9.664 7.33232 9.61228 7.38407 9.54998 7.42006L5.84998 9.58006C5.7879 9.61709 5.71714 9.63704 5.64486 9.6379C5.57258 9.63876 5.50137 9.6205 5.43842 9.58497C5.37548 9.54944 5.32305 9.49789 5.28644 9.43557C5.24983 9.37324 5.23036 9.30234 5.22998 9.23006Z" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_941_1709">
                    <rect width="14" height="14" fill="currentColor" />
                </clipPath>
            </defs>
        </svg>
    );
};