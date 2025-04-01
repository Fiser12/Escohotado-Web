import { mockUsers } from "@/core/mockData/user.model";
import { ServicesMockBuilder } from '@/modules/services-mock-builder';
import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from ".";
import { CardGridView00, CardGridView01, CardGridView02, CardGridView03 } from "../../../core/mockData/grid_layout.model";
import HomeHero from "@/components/organisms/home_hero";

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

export const Grid00: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView00 />
      </>,
      user: mockUsers.basic,
    }),
  }
};

export const Grid00Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView00 />
      </>,
      user: mockUsers.basic,
    }),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};

export const Grid01: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView01 />
      </>,
      user: mockUsers.basic,
    }),
  }
};

export const Grid01Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView01 />
      </>,
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
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView02 />
      </>,
      user: mockUsers.basic,
    }),
  }
};
export const Grid02Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView02 />
      </>,
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
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView03 />
      </>,
      user: mockUsers.basic,
    }),
  }
};
export const Grid03Mobile: Story = {
  args: {
    services: ServicesMockBuilder({
      children: <>
        <HomeHero
          description="Antonio Escohotado"
          buttons={[{ title: "Leer más", link: "#" }]}
        />
        <CardGridView03 />
      </>,
      user: mockUsers.basic,
    }),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};

