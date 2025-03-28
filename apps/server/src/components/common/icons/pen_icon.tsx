import classNames from 'classnames';

interface Props {
    className?: string;
}

export const PenIcon: React.FC<Props> = ({
    className = '',
}) => {
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
            <g clipPath="url(#clip0_544_1658)">
                <path d="M9.34323 8.0632L8.98997 11.2428C8.94765 11.6234 8.65609 11.9286 8.27789 11.9884L1.42246 13.0708C1.1375 13.1158 0.8915 12.8698 0.936493 12.5848L2.01893 5.7294C2.07864 5.3512 2.38392 5.05964 2.76447 5.01735L5.94409 4.66406" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.27002 12.737L4.66916 9.33789" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="5.01533" cy="8.99211" r="0.928908" fill="currentColor" />
                <rect x="8.09424" y="0.923859" width="7" height="4" rx="1" transform="rotate(44.7066 8.09424 0.923859)" stroke="currentColor" strokeWidth="0.8" />
            </g>
            <defs>
                <clipPath id="clip0_544_1658">
                    <rect width="14" height="14" fill="currentColor" />
                </clipPath>
            </defs>
        </svg>
    );
};
