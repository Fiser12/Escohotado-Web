import type { Meta, StoryObj } from "@storybook/react";
import { H4 } from "./H4";

const meta: Meta<typeof H4> = {
  title: "Documentation/Typography/Styles/Headers",
  component: H4,
  args: {
    label: "Sample Heading 4",
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev",
    },
  },
} satisfies Meta<typeof H4>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  name: "H4",
};
