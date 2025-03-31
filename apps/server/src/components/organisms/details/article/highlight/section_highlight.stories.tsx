import { Meta, StoryObj } from "@storybook/react";
import { HighlightSection } from "./section_highlight";
import { Typo } from "@/components/atoms/typographies/Typographies";
import { MainButton } from "@/components/atoms/main_button/main_button";

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
        coverHref: { control: "text", description: "Image URL for the cover" },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Highlight: Story = {
    args: {
        children: <>
            <Typo.H4 className="text-white">¿Quieres descubrir toda la obra de Antonio Escohotado?</Typo.H4>
            <MainButton text="Suscribete" color="secondary" />
        </>
    },
};