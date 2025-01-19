import classNames from 'classnames';

type Args = {
    className?: string,
    label: string,
}

export const H3 = (args: Args) => {
    const headerClass = classNames(
        args.className, 
        'text-black text-[clamp(1rem,2.5vw,2.5rem)] font-regular font-display',
    );

    return (
        <h3 className={headerClass}>{args.label}</h3>
    )
};

