import type { Meta, StoryObj } from '@storybook/react';
import { SubscriptionCard } from './subscription_card';
import { MainButton } from "../common/main_button/main_button";

const meta = {
  title: 'Subscription/Component/SubscriptionCard',
  component: SubscriptionCard,
  args: {
    price: '49.99€',
    title: 'Plan Básico',
    interval: 'month',
    features: [
      'Acceso a la newsletter',
      'Acceso anticipado a los vídeos',
      'Acceso a parte del contenido',
    ],
    mainCard: false,
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=490-2295&m=dev',
    },
  },
} satisfies Meta<typeof SubscriptionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    mainCard: false,
  },
  render: (args) => (
    <SubscriptionCard {...args}>
      <MainButton text="Comprar" />
    </SubscriptionCard>
  ),
};

export const Destacado: Story = {
  args: {
    mainCard: true,
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=490-2445&m=dev',
    },
  },
  render: (args) => (
    <SubscriptionCard {...args}>
      <MainButton text="Comprar"  />
    </SubscriptionCard>
  ),
};
