import classNames from 'classnames';

interface Props {
    className?: string;
}

export const YoutubeIcon: React.FC<Props> = ({
    className = '',
}) => {
    const iconClass = classNames(
        'fill-current',
        className,
    );

    return (
        <svg
            viewBox="0 0 24 24"
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <path
            d="M23.498 6.186c-.273-1.033-1.082-1.845-2.115-2.118C19.789 3.75 12 3.75 12 3.75s-7.789 0-9.383.318c-1.033.273-1.842 1.085-2.115 2.118C0.188 7.78 0.188 12 0.188 12s0 4.22.314 5.814c.273 1.033 1.082 1.845 2.115 2.118 1.594.318 9.383.318 9.383.318s7.789 0 9.383-.318c1.033-.273 1.842-1.085 2.115-2.118.314-1.594.314-5.814.314-5.814s0-4.22-.314-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            fill="currentColor"
            />
        </svg>
    );
};
