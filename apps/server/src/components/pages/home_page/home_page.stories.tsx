import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from ".";
import { featuredGrid01, featuredGrid02, featuredGrid03 } from "../../../core/mockData/grid_layout.model";
import { ServicesMockBuilder } from "@/modules/services";

const meta: Meta<typeof HomePage> = {
  title: "Pages/Home",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figspec",
      url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=283-707&t=acmeOqADvcdhZQZx-4"
    },
  },
  args: {
    services: ServicesMockBuilder({children: <div>Mock</div>}),
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};

export const Grid01: Story = {
  args: {
    featuredItems: [featuredGrid01],
  }
};

export const Grid02: Story = {
  args: {
    featuredItems: [featuredGrid02],
  }
};

export const Grid03: Story = {
  args: {
    featuredItems: [featuredGrid03],
  }
};

