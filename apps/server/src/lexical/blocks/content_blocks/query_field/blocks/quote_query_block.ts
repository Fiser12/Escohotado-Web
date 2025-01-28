import { Block } from "payload";
import { filterQueryField } from "./fields/filter_query_field";
import { sortQueryField } from "./fields/sort_query_field";
import { querySizeField } from "./fields/query_size_field";
import { filterByQuoteOriginField } from "./fields/filter_quote_query_by_origin_field";

export const quoteQueryBlock: Block = {
    slug: 'quoteQueryBlock',
    labels: {
        singular: 'Consulta de citas',
        plural: 'Consultas de citas',
    },
    fields: [
        {
            type: 'row',
            fields: [
                filterQueryField,
                filterByQuoteOriginField,
                querySizeField,
                sortQueryField,
            ]
        }
    ]
}