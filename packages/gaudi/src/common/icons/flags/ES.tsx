import classNames from 'classnames';

interface Args {
    className?: string;
}

export const ESFlag = ({ className = '' }: Args): JSX.Element => {
    const iconClass = classNames('w-4', className);

    return (
        <svg
            viewBox="0 0 16 13"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0.5V12.5H16V0.5H0Z"
                fill="#FFB400"
            />
            <mask
                id="mask0_773_1797"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="13"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0.5V12.5H16V0.5H0Z"
                    fill="white"
                />
            </mask>
            <g mask="url(#mask0_773_1797)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0.5V3.5H16V0.5H0Z"
                    fill="#C51918"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 9.5V12.5H16V9.5H0Z"
                    fill="#C51918"
                />
            </g>
        </svg>
    );
};
