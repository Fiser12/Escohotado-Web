import classNames from 'classnames';

type Args = {
    className?: string,
    label: string,
}

export const H3 = (args: Args) => {
    const headerClass = classNames(
        args.className, 
        'text-black text-2xl md:text-3xl font-regular font-display',
    );

    return (
        <h3 className={headerClass}>{args.label}</h3>
    )
};

