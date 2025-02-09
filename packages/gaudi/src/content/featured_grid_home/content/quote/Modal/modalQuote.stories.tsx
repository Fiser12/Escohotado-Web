import { Meta, StoryObj } from "@storybook/react";
import { ModalQuote } from "./modalQuote";

const meta: Meta = {
    title: "Molecules/Modals",
    component: ModalQuote,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: ""
        },
    },
    args: {
        quote: '"Las drogas no son ni buenas ni malas, son sustancias que pueden usarse bien o mal, y el único antídoto real contra su mal uso es la educación. Las drogas no son ni buenas ni malas, son sustancias que pueden usarse bien o mal, y el único antídoto real contra su mal uso es la educación."',
        author: "Caos y Orden",
        categories: [
              {
                    id: "1",
                    label: "Drogas",
              },
              {
                    id: "2",
                    label: "Educación",
              },
        ]
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Quote: Story = {};