import { getPayload } from "@/payload/utils/getPayload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_TAXONOMY } from "@/payload/collections/config";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
}

export async function MedioBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_TAXONOMY,
		pagination: false
	})
	const tagsAsRecord: Record<string, { label: string }> = {};
	taxonomies.docs
		.filter(taxonomy => taxonomy.breadcrumbs?.some(breadcrumb => breadcrumb.url?.includes("medio/")))
		.forEach((taxonomy) => {
			if (taxonomy.slug)
				tagsAsRecord[taxonomy.slug] = { label: taxonomy.plural_name ?? taxonomy.singular_name };
		});

	return (
		<FilterBarNuqs
			title="Medio"
			queryKey="medio"
			multiple={false}
			{...props}
			tags={tagsAsRecord}
		/>
	);
}
