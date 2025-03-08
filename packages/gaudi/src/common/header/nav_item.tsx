import classNames from 'classnames';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLElement> {
    href?: string;
    tabindex?: number;
    variant?: 'primary' | 'secondary';
};
export const NavItem = ({ href, children, tabindex, variant = 'primary', className }: Props) => {
    const classname = classNames(
        'text-sm',
        'font-normal',
        'font-body',
        'leading-none',
        'whitespace-nowrap',
        'shrink-0',
        'flex',
        'gap-1.5',
        'text-primary-900',
        {
            'text-primary-900': variant === 'primary',
            'text-white hover:underline hover:underline-offset-1': variant === 'secondary',
        },
        className
    )
    if(!href) {
        return (
            <div className={classname}>
                {children}
            </div>
        );
    }
    return (
        <Link
            tabIndex={tabindex}
            href={href}
            className={classname}
        >
            {children}
        </Link>
    );
};
