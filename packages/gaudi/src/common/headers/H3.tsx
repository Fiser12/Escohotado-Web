import classNames from 'classnames';

type Args = {
    className?: string,
    label: string,
}

export const H3 = (args: Args) => {
    const headerClass = classNames(
        'text-black text-4xl font-regular font-display',
        args.className,
    );

    return (
        <h3 className={headerClass}>{args.label}</h3>
    )
};

