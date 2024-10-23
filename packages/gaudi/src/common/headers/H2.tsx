type Args = {
    className?: string,
    label: string
}

export const H2 = ({ label }: Args) => {
    return (
        <h1 className={"text-center text-black text-5xl font-normal font-['YesevaOne'] leading-10"}>{label}</h1>
    )
}

