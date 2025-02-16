import { Meta, StoryObj } from "@storybook/react";
import { HighlightSection } from "./section_highlight";
import { MainButton } from "../../../client";

const meta: Meta<typeof HighlightSection> = {
    title: "Organism",
    component: HighlightSection,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=302-3084&t=3gc5bSOiadLfboYX-4",
        },
    },
    argTypes: {
        description: { control: "text", description: "Text for the description" },
        coverHref: { control: "text", description: "Image URL for the cover" },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Highlight: Story = {
    name: "Highlight",
    args: {
        description: "¿Te gustaría pasear por la biblioteca de artículos personales de Escohotado?",
        coverHref: "https://placehold.co/1920x300",
        children: <MainButton text="Suscribete" color="secondary" />
    },
};