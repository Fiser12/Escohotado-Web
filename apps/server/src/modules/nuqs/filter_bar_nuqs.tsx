"use client";

import { parseAsString, useQueryState } from "nuqs";
import { SelectDropdown } from "@/components/content/common/selectors/select_dropdown";

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

export function FilterBarNuqs({queryKey, className, ...props}: Props) {
	const [tags, setSearch] = useQueryState(
		queryKey,
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);

	return (
		<SelectDropdown
			{...props}
			className={className}
			showSelectionAtLabel={false}
			color="white"
			showClearButton={props.showClearButton ?? true}
			selectedTags={tags.split(',').filter(Boolean) ?? []}
			onSelectedTagsChange={(tags: string[]) => {
				setSearch(tags.join(","))
			}}
		/>
	);
}
