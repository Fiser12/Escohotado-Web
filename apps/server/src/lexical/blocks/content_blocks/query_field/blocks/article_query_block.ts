import { Block } from "payload";
import { filterQueryField } from "./fields/filter_query_field";
import { sortQueryField } from "./fields/sort_query_field";
import { querySizeField } from "./fields/query_size_field";

export const articleQueryBlock: Block = {
    slug: 'articleQueryBlock',
    labels: {
        singular: 'Consulta de artículos',
        plural: 'Consultas de artículos',
    },
    fields: [
        {
            type: 'row',
            fields: [
                filterQueryField,
                querySizeField,
                sortQueryField         
            ]
        }
    ]
}