import classNames from 'classnames';

type Args = {
    className?: string,
    label: string
}

export const H1 = (args: Args) => {
    const headerClass = classNames(
        'text-primary-900 text-4xl md:text-6xl font-regular font-display leading-tight',
        args.className,
    );

    return (
        <h1 className={headerClass}>{args.label}</h1>
    )
}

