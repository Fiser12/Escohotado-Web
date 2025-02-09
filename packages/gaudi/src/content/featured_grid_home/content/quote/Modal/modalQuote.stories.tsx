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
            isOpen: true,
            children: <div>Las drogas no son ni buenas ni malas, son sustancias que pueden usarse bien o mal, y el único antídoto real contra su mal uso es la educación. Las drogas no son ni buenas ni malas, son sustancias que pueden usarse bien o mal, y el único antídoto real contra su mal uso es la educación.</div>,
    },
    argTypes: {
            isOpen: {
                  description: "Indicates if the modal is open",
                  control: "boolean",
                  type: { name: "boolean", required: true },
            }
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Quote: Story = {};