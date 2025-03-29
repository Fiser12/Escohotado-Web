import classNames from 'classnames';

interface Props {
    className?: string;
}

export const AllIcon: React.FC<Props> = ({
    className = '',
}) => {
    const iconClass = classNames(
        className,
        "text-gray-700"
    );

    return (
        <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
};
