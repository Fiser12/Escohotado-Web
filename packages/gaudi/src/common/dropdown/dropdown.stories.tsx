import { Meta, StoryObj } from "@storybook/react";
import { BasicDropdown } from ".";
import { EmailIcon } from "../icons/email_icon";

const meta: Meta<typeof BasicDropdown> = {
    title: "Molecules/Dropdown",
    component: BasicDropdown,
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: '',
        },
    },
    argTypes: {
        text: { control: "text", description: "Text for the dropdown" },
        icon: { control: "boolean", description: "Toggle to show or hide the icon" },
    },
    args: {
        text: "Sample text",
        menuSections: [
            {
                title: "Section 1",
                items: [
                    { text: "Option 1", action: async () => alert("Option 1 clicked") },
                    { text: "Option 2", href: "#" },
                ],
            },
        ],
        icon: false,
    },
    render: ({ icon, ...args }) => (
        <BasicDropdown
            {...args}
            icon={icon ? <EmailIcon /> : null} 
        />
    ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {};
