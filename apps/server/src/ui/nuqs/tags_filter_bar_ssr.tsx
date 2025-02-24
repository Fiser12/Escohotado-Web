import { FilterBarNuqs } from "./filter_bar_nuqs";
import { collectionsContentsSlugs } from "hegel/payload";
import { tagsFromContentQuery } from "@/core/content/tagsFromContentQuery";
import { CategoryModel } from "hegel";

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
    if(taxonomies.length === 0) return null;
    
    const tagsAsRecord: Record<string, CategoryModel> = {};
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
