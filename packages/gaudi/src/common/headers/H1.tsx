

type Args = {
    className?: string,
    label: string
}

export const H1 = ({ label }: Args) => {
    return (
        <h1 className={"text-[#023350] text-6xl font-regular font-yesevaone"}>{label}</h1>
    )
}

