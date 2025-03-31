"use client";

import { SelectDropdown } from "@/components/common/selectors/select_dropdown";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	title: string
	multiple?: boolean;
	queryKey: string;
	listOfTags: Record<string, {
		label: string
	}>;
	initialValue: string[];
	setValue: (newValue: string) => void
	showClearButton?: boolean;
}

export function FilterBar({ queryKey, initialValue, setValue, className, listOfTags, ...props }: Props) {

	return (
		<SelectDropdown
			{...props}
			className={className}
			showSelectionAtLabel={false}
			color="white"
			listOfTags={listOfTags}
			showClearButton={props.showClearButton ?? true}
			selectedTags={initialValue}
			onSelectedTagsChange={(tags: string[]) => {
				setValue(tags.join(","))
			}}
		/>
	);
}
