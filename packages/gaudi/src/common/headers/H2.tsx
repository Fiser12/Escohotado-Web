import classNames from 'classnames';

type Args = {
    className?: string,
    label: string
}

export const H2 = (args: Args) => {
    const headerClass = classNames(
        'text-primary-900 text-3xl md:text-5xl font-regular font-display',
        args.className,
    );

    return (
        <h2 className={headerClass}>{args.label}</h2>
    )
}

