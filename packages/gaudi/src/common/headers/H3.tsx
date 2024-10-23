type Args = {
    className?: string,
    label: string
}

export const H3 = ({ label }: Args) => {
    return (
        <h1 className={"text-3xl font-normal font-['YesevaOne']"}>{label}</h1>
    )
}

