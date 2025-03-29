"use client";

import { SearchBar } from "@/components/content/common/search_bar";
import { parseAsString, useQueryState } from "nuqs";
import { FilterBar } from "./filter_bar";
import { CategoryModel } from "hegel";

export const QuotesFilterBar = ({ listOfTags }: { listOfTags: Record<string, CategoryModel> }) => {
	const [search, setSearch] = useQueryState(
		"query",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);
	const [selectedTags, setTags] = useQueryState(
		"quotes-tags",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);

	return (
		<div className='flex flex-row-reverse gap-3 w-full'>
			      <FilterBar
        multiple={false}
        initialValue={selectedTags?.split(',') ?? []}
        setValue={(text) => setTags(text)}
        title="Etiquetas"
        queryKey="tags"
        listOfTags={listOfTags}
      />

		<SearchBar
			initialValue={search}
			applyText={setSearch}
		/>
		</div>
	);
}

