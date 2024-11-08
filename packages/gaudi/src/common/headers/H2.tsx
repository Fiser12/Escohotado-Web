type Args = {
    className?: string,
    label: string
}

export const H2 = ({ label }: Args) => {
    return (
        <h1 className={"text-primary-900 text-5xl font-regular font-display"}>{label}</h1>
    )
}

