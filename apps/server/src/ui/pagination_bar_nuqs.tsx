"use client";

import { parseAsString, useQueryState } from "nuqs";
import { PaginationBar } from "gaudi/client";

interface Props {
    maxPage: number;
}

export function PaginationBarNuqs(props: Props) {
	const [page, setPage] = useQueryState(
		"page",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("1")
	);
	const scrollToId = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
		  element.scrollIntoView({ behavior: "smooth" });
		}
	};
	
	return (
		<PaginationBar
            currentPage={parseInt(page)}
            goToPage={(page) => {
                setPage(page.toString());
				scrollToId("h2-articles")
            }}
			{...props}
		/>
	);
}

