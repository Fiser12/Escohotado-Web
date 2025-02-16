import type { Meta, StoryObj } from "@storybook/react";
import { H3 } from "./H3";

const meta: Meta<typeof H3> = {
  title: "Documentation/Typography/Styles/Headers",
  component: H3,
  args: {
    label: "Sample Heading 3",
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev",
    },
  },
} satisfies Meta<typeof H3>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Header3: Story = {
  name: "H3",
};
