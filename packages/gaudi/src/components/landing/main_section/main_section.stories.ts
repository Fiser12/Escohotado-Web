import type { Meta, StoryObj } from '@storybook/svelte';
import { MainSection } from 'index';
import { mobileParameters } from '../../storybook.js';

const meta = {
	title: 'Landing/Section/Main Section',
	component: MainSection,
	args: {},
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/CQS7dIcNELi5HMFoEoNcsX/Nexo-Labs?node-id=83-4246&t=6S2t4TA9HCLBkeoP-4'
		}
	}
} satisfies Meta<MainSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { parameters: mobileParameters };