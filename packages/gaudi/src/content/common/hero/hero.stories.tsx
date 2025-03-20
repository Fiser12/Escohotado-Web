import { Meta, StoryObj } from "@storybook/react";
import { MainHero } from ".";
import { MainButton } from "../../../common/main_button/main_button";
import { ImageParallax } from "../../book/cards/image_parallax";

const meta: Meta<typeof MainHero> = {
    title: "Organism/Hero",
    component: MainHero,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=132-727&t=IbC3J7bF5FGU0FcI-4",
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the Hero" },
        media: {
            description: "Image to be displayed",
            control: false,
        },
        children: {
            description: "Children components to be rendered",
            control: false,
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Book: Story = {
    name: "Book",
    args: {
        title: "Sample Book Title",
    },
    render: args => (
        <MainHero
            {...(args as any)}
            image={
                <ImageParallax
                    className="max-h-[550px] px-2 sm:px-20 md:px-8 lg:px-10"
                    shadow={false}
                >
                    <img src="https://placehold.co/350x500" alt="Sample image" />
                </ImageParallax>
            }
            children={
                <MainButton text="Sumérgete en la lectura" />
            }
        />
    ),
};
