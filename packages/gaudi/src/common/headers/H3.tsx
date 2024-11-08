import classNames from 'classnames';

type Args = {
    className?: string,
    label: string,
}

export const H3 = ({ label }: Args) => {
    return (
        <h3 className={"text-black text-4xl font-regular font-display"}>{label}</h3>
    )
};

