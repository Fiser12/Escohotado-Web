import { Field } from "payload";

export const querySizeField: Field = {
    name: 'querySize',
    label: 'Tamaño de la consulta',
    type: 'number',
    max: 20,
    min: 1
}