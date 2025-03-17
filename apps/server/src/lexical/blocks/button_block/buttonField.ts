import { routes } from "hegel";
import { Field } from "payload";

export const buttonField: Field = {
  type: 'row',
  fields: [
    {
      type: 'text',
      name: 'label',
      label: 'Texto del botón',
    },
    {
      type: 'select',
      label: "Estilo",
      name: 'type_of_button_style',
      options: [
        { label: 'Primary Fill', value: 'primary_fill' },
        { label: 'Secondary Fill', value: 'secondary_fill' },
        { label: 'Primary Line', value: 'primary_line' },
        { label: 'Secondary Line', value: 'secondary_line' },
  ]
    },
    {
        type: 'select',
        name: 'type_of_button_link',
        options: [
            { label: 'Colecciones', value: 'collections' },
            { label: 'Páginas estáticas', value: 'static' },
            { label: 'Página externa', value: 'external' },
        ],
        defaultValue: 'collections',
        label: 'Tipo de enlace',
    },
    {
        type: 'relationship',
        name: 'collections',
        relationTo: ['search-results'],
        hasMany: false,
        admin: {
            condition: (_, siblingData) => siblingData.type_of_button_link === 'collections',
        }
    },
    {
      type: 'select',
      name: 'static',
      options: Object.entries(routes.nextJS)
        .filter(([_, value]) => typeof value === 'string')
        .cast<[string, string]>()
        .map(([key, value]) => ({ 
          label: transformKeyToLabel(key), 
          value: value 
        })),
      admin: {
          condition: (_, siblingData) => siblingData.type_of_button_link === 'static',
      }
    },
    {
      type: 'text',
      name: 'href',
      label: 'URL',
      admin: {
          condition: (_, siblingData) => siblingData.type_of_button_link === 'external',
      }
    }
  ]
}

export const buttonsField: (maxRowNumber?: number) => Field = (maxRowNumber) => ({
  name: 'buttons',
  type: 'array',
  fields: [
    buttonField
  ],
  maxRows: maxRowNumber
})

function transformKeyToLabel(key: string): string {
  let formatted = key.replace(/Href$/, '');
  formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  formatted = formatted.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return formatted;
}

export type ButtonColorType = "primary_fill" | "secondary_fill" | "primary_line" | "secondary_line";

interface ButtonStatic {
  id: string;
  label: string;
  static: string;
  type_of_button_link: "static";
  type_of_button_style: ButtonColorType;
}

interface ButtonExternal {
  id: string;
  label: string;
  href: string;
  type_of_button_link: "external";
  type_of_button_style: ButtonColorType;
}

interface ButtonCollection {
  id: string;
  label: string;
  collections: {
    value: {
      href: string;
    };
  };
  type_of_button_link: "collections";
  type_of_button_style: ButtonColorType;
}

export type ButtonLexicalType = ButtonStatic | ButtonExternal | ButtonCollection;
