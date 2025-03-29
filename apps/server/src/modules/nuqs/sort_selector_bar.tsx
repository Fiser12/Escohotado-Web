"use client"

import { parseAsString, useQueryState } from "nuqs";
import { FilterBar } from "./filter_bar";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
}

export function SortSelector(props: Props) {
    const tagsAsRecord: Record<string, { label: string }> = {
        popularity: { label: "Popularidad" },
        publishedAt: { label: "Fecha de publicación" },
    };
    const [sort, setSort] = useQueryState(
        "sort",
        parseAsString
            .withOptions({ shallow: false })
            .withDefault("")
    );
    return (
        <FilterBar
            initialValue={[sort]}
            setValue={(value) => setSort(value)}
            className="w-full"
            title="Ordenar por"
            queryKey="sort"
            multiple={false}
            showClearButton={false}
            {...props}
            listOfTags={tagsAsRecord}
        />
    );
}
