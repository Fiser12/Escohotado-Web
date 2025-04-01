import { Block } from "payload";
import { filterQueryField } from "./fields/filter-query-field";
import { sortQueryField } from "./fields/sort-query-field";
import { querySizeField } from "./fields/query-size-field";

export const videoQueryBlock: Block = {
    slug: 'videoQueryBlock',
    labels: {
        singular: 'Consulta de vídeos',
        plural: 'Consultas de vídeos',
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