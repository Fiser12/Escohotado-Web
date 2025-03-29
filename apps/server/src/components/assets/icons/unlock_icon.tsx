import classNames from 'classnames';

interface Props {
    className?: string;
}

export const UnlockIcon: React.FC<Props> = ({
    className = '',
}) => {
    const iconClass = classNames(
        className,
    );

    return (
        <svg
            viewBox="0 0 19 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
        >
            <g clipPath="url(#clip0_925_914)">
                <path d="M15.7566 11.8783H2.84269C1.95118 11.8783 1.22845 12.601 1.22845 13.4925V23.178C1.22845 24.0695 1.95118 24.7922 2.84269 24.7922H15.7566C16.6481 24.7922 17.3708 24.0695 17.3708 23.178V13.4925C17.3708 12.601 16.6481 11.8783 15.7566 11.8783Z" stroke="currentColor" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.29967 19.1424C9.74543 19.1424 10.1068 18.7811 10.1068 18.3353C10.1068 17.8896 9.74543 17.5282 9.29967 17.5282C8.85392 17.5282 8.49255 17.8896 8.49255 18.3353C8.49255 18.7811 8.85392 19.1424 9.29967 19.1424Z" stroke="currentColor" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.9495 11.5289V6.46502C14.9495 4.96659 14.3543 3.52953 13.2947 2.46999C12.2352 1.41043 10.7981 0.815186 9.29967 0.815186C7.80124 0.815186 6.36418 1.41043 5.30464 2.46999C4.24509 3.52953 3.64984 4.96659 3.64984 6.46502" stroke="currentColor" strokeWidth="1.61424" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_925_914">
                    <rect width="19" height="26" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
