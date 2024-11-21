import classNames from 'classnames';

type Args = {
    className?: string,
    label: string
}

export const H4 = (args: Args) => {
    const headerClass = classNames(
        'text-center text-black text-xl font-normal font-body',
        args.className,
    );

    return (
        <h4 className={headerClass}>{args.label}</h4>
    )
}