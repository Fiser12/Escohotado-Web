import { Block } from "payload";
import { filterQueryField } from "./fields/filter-query-field";
import { sortQueryField } from "./fields/sort-query-field";
import { querySizeField } from "./fields/query-size-field";
import { filterByQuoteOriginField } from "./fields/filter-quote-query-by-origin-field";

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