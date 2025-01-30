import { getPayload } from "@/payload/utils/getPayload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_TAXONOMY } from "hegel/payload";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
}

export async function AutorBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_TAXONOMY,
		pagination: false
	})
	const tagsAsRecord: Record<string, { label: string }> = {};
	taxonomies.docs
		.filter(taxonomy => taxonomy.breadcrumbs?.some(breadcrumb => breadcrumb.url?.includes("autor/")))
		.forEach((taxonomy) => {
			if (taxonomy.slug)
				tagsAsRecord[taxonomy.slug] = { label: taxonomy.singular_name };
		});

	return (
		<FilterBarNuqs
			{...props}
			title="Autores"
			queryKey="autor"
			multiple={false}
			tags={tagsAsRecord}
		/>
	);
}
