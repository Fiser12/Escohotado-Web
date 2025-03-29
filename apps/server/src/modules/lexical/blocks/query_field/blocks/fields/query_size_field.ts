import { Field } from "payload";

export const querySizeField: Field = {
    name: 'querySize',
    label: 'Tamaño de la consulta',
    type: 'number',
    defaultValue: 5,
    max: 20,
    min: 1,
    required: true
}