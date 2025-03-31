"use client"

import { parseAsString } from "nuqs";
import { useQueryState } from "nuqs";
import { FilterBar } from "./filter_bar";
import { SearchBar } from "@/components/layout/search_bar";

export const VideoFilterBar = () => {
	const [selectedPlaylists, setSelectedPlaylists] = useQueryState(
		"playlist",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);
	const [querySelected, setQuery] = useQueryState(
		"query",
		parseAsString
			.withOptions({ shallow: false })
			.withDefault("")
	);
	return (
		<div className="flex flex-col sm:flex-row gap-3 items-end">
			<FilterBar
				title="Playlists"
				multiple={false}
				initialValue={selectedPlaylists.split(",")}
				queryKey="playlist"
				setValue={(value) => {
					setSelectedPlaylists(value);
				}}
				listOfTags={{
					"filosofia": { label: "Filosofía" },
					"libertad": { label: "Libertad" },
					"religion": { label: "Religión" },
					"homenaje,homenajes": { label: "Homenajes" },
					"veneno": { label: "Venenos" },
					"cannabis": { label: "Cannabis" },
					"tabaco": { label: "Tabaco" },
					"cocaina": { label: "Cocaína" },
					"heroina": { label: "Heroina" },
					"mdma": { label: "MDMA" },
					"lsd": { label: "LSD" },
					"tv": { label: "Tv" },
					"socrates": { label: "Sócrates" },
					"aristoteles": { label: "Aristóteles" },
					"platon": { label: "Platón" },
					"hume": { label: "Hume" },
				}}
			/>
			<SearchBar
				initialValue={querySelected}
				applyText={(text) => setQuery(text)}
			/>
		</div>
	);
}
