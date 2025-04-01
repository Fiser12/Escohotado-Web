import { mockUsers } from "@/core/mockData/user.model";
import { ServicesMockBuilder } from '@/modules/services-mock-builder';
import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from ".";
import { CardGridView00, CardGridView01, CardGridView02, CardGridView03 } from "../../../core/mockData/grid_layout.model";
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
    user: mockUsers.basic,
    services: ServicesMockBuilder({
      children: <div>Mock</div>,
      user: mockUsers.basic,
    }),
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Grid01: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView01 />,
      user: mockUsers.basic,
    }),
  }
};

export const Grid00: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView00 />,
      user: mockUsers.basic,
    }),
  }
};

export const Grid00Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView00 />,
      user: mockUsers.basic,
    }),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};

export const Grid01Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView01 />,
      user: mockUsers.basic,
    }),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};

export const Grid02: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView02 />,
      user: mockUsers.basic,
    }),
  }
};
export const Grid02Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView02 />,
      user: mockUsers.basic,
    }),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};

export const Grid03: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView03 />,
      user: mockUsers.basic,
    }),
  }
};
export const Grid03Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <CardGridView03 />,
      user: mockUsers.basic,
    }),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};

