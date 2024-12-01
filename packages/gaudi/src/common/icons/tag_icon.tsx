import classNames from 'classnames';

interface Args {
    className?: string;
}

export const TagIcon = ({
    className = '',
}: Args): JSX.Element => {
    const iconClass = classNames(
        'h-4 w-4 stroke-current', 
        className,
    );

    return (
        <svg 
            viewBox="0 0 14 14"
            fill="none"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_421_1257)">
                <path 
                    d="M12.7754 8.77424L8.7923 12.7745C8.6483 12.9189 8.45312 13 8.24961 13C8.04611 13 7.85091 12.9189 7.70693 12.7745L1.11388 6.20466C1.07415 6.16653 1.04344 6.11996 1.02398 6.06835C1.00442 6.01676 0.996745 5.96144 1.00125 5.90644L1.60537 1.96791C1.61029 1.87405 1.64961 1.78536 1.71575 1.71891C1.782 1.65244 1.87026 1.61293 1.96375 1.60799L5.88542 1.00127C5.94018 0.996704 5.99527 1.00449 6.04664 1.02406C6.09802 1.04364 6.14439 1.0745 6.18236 1.11439L12.7754 7.6842C12.9192 7.8288 13 8.02484 13 8.22922C13 8.4336 12.9192 8.62962 12.7754 8.77424Z" 
                    stroke="currentColor"
                    strokeWidth="0.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
                <path 
                    d="M5.60947 4.71354C5.60947 5.2168 5.20278 5.62771 4.6975 5.62771C4.19215 5.62771 3.78558 5.21675 3.78558 4.71354C3.78558 4.21033 4.19215 3.79937 4.6975 3.79937C5.20278 3.79937 5.60947 4.21028 5.60947 4.71354Z" 
                    stroke="currentColor"
                    strokeWidth="0.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_421_1257">
                    <rect width="14" height="14" fill="currentColor" />
                </clipPath>
            </defs>
        </svg>
    );
};
