import { FilterBarNuqs } from "./filter_bar_nuqs";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
}

export async function SortSelectorSSR(props: Props) {
    const tagsAsRecord: Record<string, { label: string }> = {
        popularity: { label: "Popularidad" },
        publishedAt: { label: "Fecha de publicación" },
    };

    return (
        <FilterBarNuqs
            title="Ordenar por"
            queryKey="sort"
            multiple={false}
            showClearButton={false}
            {...props}
            tags={tagsAsRecord}
        />
    );
}
