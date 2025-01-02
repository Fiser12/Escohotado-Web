"use client";

import { parseAsString, useQueryState } from "nuqs";
import { SelectBoxes, MainButton } from "gaudi/client";

interface Props {
	options: {
        label: string, 
		url: string,
        id: string,
    }[]
}

export function BookVariantsSelectorNuqs(props: Props) {
	const [page, setPage] = useQueryState(
		"variantId",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);
	const currentUrl = props.options.find((option) => option.id === page)?.url;
	return (
		<div className="flex flex-col gap-8 w-full">
			<SelectBoxes
				options={props.options}
				activeId={page}
				onClick={(page) => {
					setPage(page.toString());
				}}
			/>
			
			<a href={currentUrl ?? "#"} target="_blank">
                <MainButton text="Comprar" />
            </a>
		</div>
	);
}

