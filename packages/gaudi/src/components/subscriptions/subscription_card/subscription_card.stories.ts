import type { Meta, StoryObj } from '@storybook/svelte';
import { SubscriptionCard } from 'index';
import { mobileParameters } from '../../storybook.js';

const meta = {
	title: 'Subscription/Component/SubscriptionCard',
	component: SubscriptionCard,
	args: {
		price: "49.99€",
		title: "Plan Básico",
		features: ["Acceso a la newsletter", "Acceso anticipado a los vídeos", "Acceso a parte del contenido"],
		mainCard: false
	},
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/CQS7dIcNELi5HMFoEoNcsX/Nexo-Labs?node-id=83-4246&t=6S2t4TA9HCLBkeoP-4'
		}
	}
} satisfies Meta<SubscriptionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MainCard: Story = {
	args: { mainCard: true }
};
export const Mobile: Story = { parameters: mobileParameters };