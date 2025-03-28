"use client";

import { parseAsString, useQueryState } from "nuqs";
import { MainButton } from "@/components/common/main_button/main_button";
import { SelectBoxes } from "@/components/content/common/selectors/grid_select_boxes";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	options: {
		label: string,
		url: string,
		id: string,
	}[]
}

export function BookVariantsSelector({ options, className, ...rest }: Props) {
	const [page, setPage] = useQueryState(
		"variantId",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);
	const currentUrl = options.find((option) => option.id === page)?.url;
	return (
		<div className={"flex flex-col gap-8 w-full " + (className ?? "")} {...rest}>
			<SelectBoxes
				options={options}
				activeId={page}
				onClickOption={(page) => {
					setPage(page.toString());
				}}
			/>
			<a href={currentUrl ?? "#"} target="_blank">
				<MainButton text="Comprar" />
			</a>
		</div>
	);
}

