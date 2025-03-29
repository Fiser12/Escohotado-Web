"use client";

import { SearchBar } from "@/components/content/common/search_bar";
import { FilterBar } from "@/modules/nuqs/filter_bar";
import { CategoryModel } from "hegel";
import { parseAsString, useQueryState } from "nuqs";

export const LecturasFilterBar = ({ listOfTags }: { listOfTags: Record<string, CategoryModel> }) => {
  const [selectedTags, setTags] = useQueryState(
		"tags",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);
  const [querySelected, setQuery] = useQueryState(
		"query",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-end">
      <FilterBar
        multiple={false}
        initialValue={selectedTags?.split(',') ?? []}
        setValue={(text) => setTags(text)}
        title="Etiquetas"
        queryKey="tags"
        listOfTags={listOfTags}
      />
      <SearchBar
        initialValue={querySelected}
        applyText={(text) => setQuery(text)}
      />
    </div>
  )
}