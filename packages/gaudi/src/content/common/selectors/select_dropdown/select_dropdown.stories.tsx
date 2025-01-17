import { Meta, StoryObj } from "@storybook/react";
import { SelectDropdown } from ".";
import { TagIcon } from "../../../../common/icons/tag_icon";
import { PenIcon } from "../../../../common/icons/pen_icon";
import { ESFlag } from "../../../../common/icons/flags/ES";
import { ENFlag } from "../../../../common/icons/flags/EN";

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
    name: "Categories",
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
        selectedTags: ["Tecnología", "Filosofía", "Drogopedia", "Política"],
        tags: {
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
    },
    render: (args) => (
        <SelectDropdown {...args}
            iconButton={args.iconButton ? <TagIcon /> : null}
        />
    ),
};

export const Language: Story = {
    name: "Language",
    args: {
        title: "Selecciona idioma",
        color: "white",
        selectedTags: ["ES", "EN"],
        showSelectionAtLabel: true,
        showClearButton: false,
        tags: {
            tag1: {
                label: "ES",
                icon: <ESFlag />
            },
            tag2: {
                label: "EN",
                icon: <ENFlag />
            },
        },
        multiple: false,
    },
    render: (args) => (
        <SelectDropdown {...args}
            className="min-w-[190px]"
        />
    ),
};
