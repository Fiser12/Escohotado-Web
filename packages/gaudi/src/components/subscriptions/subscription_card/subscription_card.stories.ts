import type { Meta, StoryObj } from '@storybook/svelte';
import { SubscriptionCard } from 'index';
import { mobileParameters } from '../../storybook.js';

const meta = {
	title: 'Subscription/Component/SubscriptionCard',
	component: SubscriptionCard,
	args: {
		price: "9.99",
		title: "Basic",
		features: ["Feature 1", "Feature 2", "Feature 3"],
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