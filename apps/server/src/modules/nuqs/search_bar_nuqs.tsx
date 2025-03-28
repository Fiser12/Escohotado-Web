"use client";

import { SearchBar } from "@/components/content/common/search_bar";
import { parseAsString, useQueryState } from "nuqs";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
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
			{...props}
			initialValue={search}
			applyText={setSearch}
		/>
	);
}

