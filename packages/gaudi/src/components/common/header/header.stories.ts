import type { Meta } from '@storybook/svelte';
import { Header } from 'index';
import { mobileParameters } from 'gaudi/components/storybook.js';
import { mockUser } from 'gaudi/mockData/user.model';

const meta = {
	title: 'Common/Components/Header',
	component: Header,
	args: {
		user: mockUser
	},
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/CQS7dIcNELi5HMFoEoNcsX/Nexo-Labs?node-id=83-4246&t=6S2t4TA9HCLBkeoP-4'
		}
	}
} satisfies Meta<Header>;

export default meta;

export const Default = { parameters: {}};
export const Mobile = { parameters: mobileParameters };