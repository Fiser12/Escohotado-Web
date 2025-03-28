import type { Meta, StoryObj } from "@storybook/react";
import { H1 } from "./H1";

const meta: Meta<typeof H1> = {
  title: "Documentation/Typography/Styles/Headers",
  component: H1,
  args: {
    label: "Sample Header",
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev",
    },
  },
} satisfies Meta<typeof H1>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Header1: Story = {
  name: "H1",
};
