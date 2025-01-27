import { Field } from "payload";

export const sortQueryField: Field = {
    name: 'sort',
    label: 'Criterio de orden',
    type: 'select',
    options: [
        {
            label: 'Fecha de publicación',
            value: 'publishedAt'
        },
        {
            label: 'Popularidad',
            value: 'publishedAt'
        }
    ]
    
}