import classNames from 'classnames';

interface Args {
    text: string;
    className?: string;
    variant?: 'light' | 'primary' | 'disabled';
}

export const Tag = ({
    text,
    variant = 'primary',
    className = '',
}: Args): JSX.Element => {
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
        <div className={tagClass}>
            {text}
        </div>
    );
};