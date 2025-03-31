import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from ".";
import { featuredItem, featuredGrid01, featuredGrid02, featuredGrid03  } from "../../mockData/grid_layout.model";

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
    featuredItems: [featuredItem as any],
    buttons: [
      { title: "Ver más", link: "/libros" },
    ],
    description: "Filósofo y ensayista español, dedicó su vida a explorar y desafiar las convenciones sociales."
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

