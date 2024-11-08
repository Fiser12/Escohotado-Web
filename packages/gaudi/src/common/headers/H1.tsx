

type Args = {
    className?: string,
    label: string
}

export const H1 = ({ label }: Args) => {
    return (
        <h1 className={"text-primary-900 text-6xl font-regular font-display"}>{label}</h1>
    )
}

