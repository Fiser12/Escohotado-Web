import { getPayload } from "@/utils/payload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_TAXONOMY } from "@/collections/config";

interface Props {
}

export async function AutorBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_TAXONOMY,
		where: {
			and: [
				{ selectable: { equals: true } },
				{ seed: { contains: 'autor'}}
			]
		}  
	})
	const tagsAsRecord: Record<string, string> = {};
	taxonomies.docs.forEach((taxonomy) => {
		if (taxonomy.seed)
		tagsAsRecord[taxonomy.seed] = taxonomy.singular_name;
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
