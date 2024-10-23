type Args = {
    className?: string,
    label: string
}

export const H4 = ({ label }: Args) => {
    return (
        <h1 className={"text-center text-cyan-950 text-xl font-normal font-montserrat leading-normal"}>{label}</h1>
    )
}