import classNames from 'classnames';

type TextVariant = 'primary' | 'secondary' | 'tertiary';

type Args = {
    className?: string,
    label: string,
    variant?: TextVariant;
}

export const H3 = ({ label, className = '', variant = 'primary' }: Args) => {
    const variantClass = classNames(
        'text-3xl font-normal font-["YesevaOne"]',
        {
            'text-black': variant === 'primary',
            'text-cyan-950': variant === 'secondary',
            'text-[#978a6c]': variant === 'tertiary',
        },
        className
    );
    return <h3 className={variantClass}>{label}</h3>;
}

