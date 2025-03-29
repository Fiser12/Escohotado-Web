import type { Meta, StoryObj } from "@storybook/react";
import { BasicMenu } from ".";
import { mobileParameters } from "../../storybook-helpers";
import { menuSectionsLoaderMock, mockAdminUser } from "../../mockData/user.model";

const meta: Meta<typeof BasicMenu> = {
  title: "Organism/Menus",
  component: BasicMenu,
  args: {
    menuSections: menuSectionsLoaderMock(mockAdminUser),
    toggleMenu: () => {},
  },
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=440-6646&m=dev",
    },
  },
} satisfies Meta<typeof BasicMenu>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {} };
export const Mobile: Story = { parameters: mobileParameters };
