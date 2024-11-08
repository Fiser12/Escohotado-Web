type Args = {
    className?: string,
    label: string
}

export const H4 = ({ label }: Args) => {
    return (
        <h1 className={"text-center text-black text-xl font-normal font-body"}>{label}</h1>
    )
}