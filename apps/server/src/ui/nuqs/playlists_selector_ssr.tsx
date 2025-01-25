import { FilterBarNuqs } from "./filter_bar_nuqs";

interface Props {
}

export async function PlaylistsSelectorSSR(props: Props) {
	return (
		<FilterBarNuqs
			title="Playlists"
			queryKey="playlist"
			multiple={false}
			{...props}
			tags={{
				"filosofia": {label: "Filosofía"},
				"libertad": {label: "Libertad"},
				"religion": {label: "Religión"},
				"homenaje": {label: "Homenajes"},
				"veneno": {label: "Venenos"},
				"cannabis": {label: "Cannabis"},
				"tabaco": {label: "Tabaco"},
				"mdma": {label: "MDMA"},
				"lsd": {label: "LSD"},
				"tv": {label: "Tv"},
				"conferencia": {label: "Conferencias"},
				"directos": {label: "Conferencias"},
				"socrates": {label: "Sócrates"},
				"aristoteles": {label: "Aristóteles"},
				"platon": {label: "Platón"},
				"hume": {label: "Hume"},
				
			}}
		/>
	);
}
