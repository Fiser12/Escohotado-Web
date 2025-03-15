import { Block } from "payload";
import { filterQueryField } from "./fields/filter_query_field";
import { sortQueryField } from "./fields/sort_query_field";
import { querySizeField } from "./fields/query_size_field";

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