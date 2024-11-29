import { getPayload } from "@/utils/payload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_TAXONOMY } from "@/collections/config";

interface Props {
	title: string
	selectedTags: string[];
}

export async function FilterBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_TAXONOMY,
		where: {
			selectable: { equals: true }
		}  
	})
	const tagsAsRecord: Record<string, string> = {};
	taxonomies.docs.forEach((taxonomy) => {
		tagsAsRecord[taxonomy.slug] = taxonomy.singular_name;
	});

	return (
		<FilterBarNuqs 
			{...props} 
			tags={tagsAsRecord}
		/>
	);
}
