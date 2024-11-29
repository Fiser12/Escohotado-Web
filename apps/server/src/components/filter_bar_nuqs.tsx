"use client";

import { parseAsString, useQueryState } from "nuqs";
import { FilterBar } from "gaudi/client";

interface Props {
	title: string
	selectedTags: string[];
	tags: Record<string, string>;
}

export function FilterBarNuqs(props: Props) {
	const [_, setSearch] = useQueryState(
		"tags",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);

	return (
		<FilterBar
			{...props}
			onSelectedTagsChange={(tags) => {
				setSearch(tags.join(","))
			}}
		/>
	);
}

