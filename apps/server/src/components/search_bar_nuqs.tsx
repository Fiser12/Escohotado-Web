"use client";

import { parseAsString, useQueryState } from "nuqs";
import { SearchBar } from "gaudi/client";

interface Props {
}

export function SearchBarNuqs(props: Props) {
	const [search, setSearch] = useQueryState(
		"query",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);

	return (
		<SearchBar
            initialValue={search}
			applyText={setSearch}
		/>
	);
}

