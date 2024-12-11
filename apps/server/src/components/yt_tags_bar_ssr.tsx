import { getPayload } from "@/utils/payload";
import { FilterBarNuqs } from "./filter_bar_nuqs";
import { COLLECTION_SLUG_VIDEO } from "@/collections/config";

interface Props {
}

export async function YTTagsBarSSR(props: Props) {
	const payload = await getPayload();
	const taxonomies = await payload.find({
		collection: COLLECTION_SLUG_VIDEO,
        select: {'tags': true}
    })

    const tagsAsRecord: Record<string, { label: string }> = {};
    taxonomies.docs
        .filter(taxonomy => taxonomy.tags && Array.isArray(taxonomy.tags))
        .map(taxonomy => taxonomy.tags)
        .cast<string[]>()
        .forEach(tags => {
            tags?.forEach(tag => {
                tagsAsRecord[tag] = {
                    label: capitalizeFirstLetter(tag)
                };
            });
        });
        
	return (
		<FilterBarNuqs 
			title="Tags"
			queryKey="tags"
			multiple={true}
			{...props} 
			tags={tagsAsRecord}
		/>
	);
}

function capitalizeFirstLetter(string: string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}
