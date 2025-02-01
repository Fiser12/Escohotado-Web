import { FilterBarNuqs } from "./filter_bar_nuqs";
import { collectionsContentsSlugs } from "hegel/payload";
import { TagModel, tagsFromContentQuery } from "@/core/content/tagsFromContentQuery";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    collection: (typeof collectionsContentsSlugs)[number][]
    title: string
    query: string
    queryKey: string
    excludeSeeds: string[]
}

export async function TagsFilterBarSSR({collection, query, excludeSeeds = [], ...rest}: Props) {
    const taxonomies = (await Promise.all(
        collection.map(async (collection) => await tagsFromContentQuery(collection, query, excludeSeeds))
    )).flat();
    
    const tagsAsRecord: Record<string, TagModel> = {};
    taxonomies
        .filter((taxonomy) => taxonomy.slug)
        .forEach((taxonomy) => {
            tagsAsRecord[taxonomy.slug!] = taxonomy;
        });

    return (
        <FilterBarNuqs
            {...rest}
            multiple={false}
            tags={tagsAsRecord}
        />
    );
}
