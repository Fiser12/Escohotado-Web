import type { Meta, StoryObj } from '@storybook/react';
import { MainButton } from "@/components/atoms/main-button";
import { SubscriptionCard } from './subscription-card';

const meta: Meta<typeof SubscriptionCard> = {
  title: 'Molecules/Cards',
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

export const Subscription: Story = {
  args: {
    mainCard: false,
  },
  render: (args) => (
    <SubscriptionCard
      {...args}
      title="Plan Básico"
      price="49.99€"
      interval="month"
      features={[
        'Acceso a la newsletter',
        'Acceso anticipado a los vídeos',
        'Acceso a parte del contenido',
      ]}
    >
      <MainButton text="Comprar" />
    </SubscriptionCard>
  ),
};
