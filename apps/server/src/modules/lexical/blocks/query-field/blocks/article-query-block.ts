import { Block } from "payload";
import { filterQueryField } from "./fields/filter-query-field";
import { sortQueryField } from "./fields/sort-query-field";
import { querySizeField } from "./fields/query-size-field";

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