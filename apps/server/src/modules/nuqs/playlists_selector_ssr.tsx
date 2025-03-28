import { FilterBarNuqs } from "./filter_bar_nuqs";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
}

export async function PlaylistsSelectorSSR(props: Props) {
	return (
		<FilterBarNuqs
			title="Playlists"
			queryKey="playlist"
			multiple={false}
			tags={{
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
			{...props}
		/>
	);
}
