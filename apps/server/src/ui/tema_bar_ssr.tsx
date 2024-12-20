import { getPayload } from "@/core/infrastructure/payload/utils/getPayload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_TAXONOMY } from "@/core/infrastructure/payload/collections/config";

interface Props {
}

export async function TemaBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_TAXONOMY,
		where: {
			and: [
				{ selectable: { equals: true } },
				{ seed: { contains: 'tema' } }
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
			title="Temas"
			queryKey="temas"
			multiple={true}
			{...props}
			tags={tagsAsRecord}
		/>
	);
}
