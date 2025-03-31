import { Meta, StoryObj } from "@storybook/react";
import { TagIcon, ESFlag, ENFlag } from "@/components/assets/icons";
import { SelectDropdown } from "./";
const meta: Meta<typeof SelectDropdown> = {
    title: "Atoms/Selectors",
    component: SelectDropdown,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=420-1227&t=T6gQySPAwetTNvaR-4",
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the selector" },
        onSelectedTagsChange: () => { },
        color: {
            control: {
                type: "select",
                options: ["white", "primary"],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Categories: Story = {
    argTypes: {
        multiple: {
            control: "boolean",
            defaultValue: true,
            description: "If the filter need multi-option",
        },
        iconButton: {
            control: 'boolean',
        },
    },
    args: {
        title: "Categorias",
        
        color: "primary",
        iconButton: true,
        onSelectedTagsChange: () => { },
        selectedTags: ["Tecnología", "Filosofía", "Drogopedia", "Política"],
        listOfTags: {
            tag1: {
                label: "Tecnología"
            },
            tag2: {
                label: "Filosofía"
            },
            tag3: {
                label: "Drogopedia"
            },
            tag4: {
                label: "Política"
            },
            tag5: {
                label: "Ciencias sociales"
            },
        },
        multiple: true,
    }
};

export const Language: Story = {
    args: {
        title: "Selecciona idioma",
        color: "white",
        selectedTags: ["ES", "EN"],
        onSelectedTagsChange: () => { },
        showSelectionAtLabel: true,
        showClearButton: false,
        listOfTags: {
            tag1: {
                label: "ES",
                icon: <ESFlag />
            },
            tag2: {
                label: "EN",
                icon: <ENFlag />
            },
        },
        className: "min-w-[190px]",
        multiple: false,
    }
};
