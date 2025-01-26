"use client";

import { parseAsString, useQueryState } from "nuqs";
import { SelectDropdown } from "gaudi/client";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	title: string
	multiple?: boolean;
	queryKey: string;
	tags: Record<string, {
		label: string,
		icon?: React.ReactNode
	}
	>;
	showClearButton?: boolean;
}

export function FilterBarNuqs({queryKey, ...props}: Props) {
	const [tags, setSearch] = useQueryState(
		queryKey,
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);

	return (
		<SelectDropdown
			{...props}
			showSelectionAtLabel={false}
			color="white"
			showClearButton={props.showClearButton ?? true}
			selectedTags={tags.split(',').filter(Boolean) ?? []}
			onSelectedTagsChange={(tags) => {
				setSearch(tags.join(","))
			}}
		/>
	);
}
