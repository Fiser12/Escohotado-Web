import { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from ".";
import { TagIcon } from "../../../common/icons/tag_icon";
import { PenIcon } from "../../../common/icons/pen_icon";

const meta: Meta<typeof FilterBar> = {
    title: "Atoms/Filter",
    component: FilterBar,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=420-1227&t=T6gQySPAwetTNvaR-4",
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the filter" },
        onSelectedTagsChange: () => { },
        multiple: {
            control: "boolean",
            defaultValue: true,
            description: "If the filter need multi-option",
        },
        color: {
            control: {
                type: "select",
                options: ["white", "primary"],
            },
        },
        icon: {
            control: 'boolean',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Filter: Story = {
    name: "Filter",
    args: {
        title: "Categorias",
        color: "primary",
        icon: true,
        selectedTags: ["Tecnología", "Filosofía", "Drogopedia", "Política"],
        tags: {
            tag1: "Tecnología",
            tag2: "Filosofía",
            tag3: "Drogopedia",
            tag4: "Política",
            tag5: "Ciencias Sociales",
        },
        multiple: false,
    },
    render: (args) => (
        <FilterBar {...args} icon={args.icon ? <TagIcon /> : null} />
    ),
};
