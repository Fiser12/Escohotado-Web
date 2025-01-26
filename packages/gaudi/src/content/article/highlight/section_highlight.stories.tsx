import { Meta, StoryObj } from "@storybook/react";
import { HighlightSection } from "./section_highlight";

const meta: Meta = {
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
        textButton: { control: "text", description: "Text for Button", },
        coverHref: { control: "text", description: "Image URL for the cover" },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Highlight: Story = {
    name: "Highlight",
    args: {
        description: "¿Te gustaría pasear por la biblioteca de artículos personales de Escohotado?",
        textButton: "Accede al contenido completo",
        href: "#",
        coverHref: "https://placehold.co/1920x300",
    },
};