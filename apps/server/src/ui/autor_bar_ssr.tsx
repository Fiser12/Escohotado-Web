import { getPayload } from "@/payload/utils/getPayload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_TAXONOMY } from "@/payload/collections/config";

interface Props {
}

export async function AutorBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_TAXONOMY,
		where: {
			and: [
				{ selectable: { equals: true } },
				{ seed: { contains: 'autor' } }
			]
		}
	})
	const tagsAsRecord: Record<string, { label: string }> = {};
	taxonomies.docs.forEach((taxonomy) => {
		if (taxonomy.seed)
			tagsAsRecord[taxonomy.seed] = { label: taxonomy.singular_name };
	});

	return (
		<FilterBarNuqs
			title="Autores"
			queryKey="autor"
			multiple={false}
			{...props}
			tags={tagsAsRecord}
		/>
	);
}
