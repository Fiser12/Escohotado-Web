import type { Meta, StoryObj } from "@storybook/react";
import { mockAdminUser, menuSectionsLoaderMock } from "hegel";
import { BasicMenu } from ".";
import storybookHelpers from "../../storybook-helpers";

const meta: Meta<typeof BasicMenu> = {
  title: "Molecules/Menu",
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
export const Mobile: Story = { parameters: storybookHelpers.mobileParameters };
