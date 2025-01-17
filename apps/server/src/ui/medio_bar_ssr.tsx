import { getPayload } from "@/core/infrastructure/payload/utils/getPayload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_TAXONOMY } from "@/core/infrastructure/payload/collections/config";

interface Props {
}

export async function MedioBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_TAXONOMY,
		pagination: false,
		where: {
			and: [
				{ selectable: { equals: true } },
				{ seed: { contains: 'medio' } }
			]
		}
	})
	const tagsAsRecord: Record<string, { label: string }> = {};
	taxonomies.docs.forEach((taxonomy) => {
		if (taxonomy.seed)
			tagsAsRecord[taxonomy.seed] = { label: taxonomy.plural_name ?? taxonomy.singular_name };
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
