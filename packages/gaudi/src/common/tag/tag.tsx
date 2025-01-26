import classNames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    className?: string;
    variant?: 'light' | 'primary' | 'disabled';
}

export const Tag: React.FC<Props> = ({
    text,
    variant = 'primary',
    className,
    ...rest
}) => {
    const tagClass = classNames(
        'px-3 py-1 rounded flex justify-center items-center text-center font-body text-xs inline-flex min-w-14 text-primary-900',
        className,
        {
            'bg-white': variant === 'light',
            'bg-primary-50': variant === 'primary',
            'bg-gray-200': variant === 'disabled',
        }
    );

    return (
        <div className={tagClass} {...rest}>
            {text}
        </div>
    );
};