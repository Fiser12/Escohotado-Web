import type { Meta, StoryObj } from "@storybook/react";
import { mockAdminUser, menuSectionsLoaderMock } from "hegel";
import { HeaderMenuUser } from "./header_menu_user";
import storybookHelpers from "../../../storybook-helpers";

const meta = {
  title: "Molecules/MenuUser",
  component: HeaderMenuUser,
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
} satisfies Meta<typeof HeaderMenuUser>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {} };
export const Mobile: Story = { parameters: storybookHelpers.mobileParameters };
