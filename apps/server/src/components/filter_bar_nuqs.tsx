"use client";

import { parseAsString, useQueryState } from "nuqs";
import { FilterBar } from "gaudi/client";

interface Props {
	title: string
	multiple?: boolean;
	queryKey: string;
	selectedTags: string[];
	tags: Record<string, string>;
}

export function FilterBarNuqs(props: Props) {
	const [_, setSearch] = useQueryState(
		props.queryKey,
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

