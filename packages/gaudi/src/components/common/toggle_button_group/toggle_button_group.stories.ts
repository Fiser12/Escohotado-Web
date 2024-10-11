import type { Meta, StoryObj } from '@storybook/svelte';
import { ToggleButtonGroup } from 'index';
import { mobileParameters } from 'gaudi/components/storybook.js';

const meta = {
	title: 'Common/Atoms/Toggle Button Group',
	component: ToggleButtonGroup,
	args: {
        selected: {id: '1', label: 'Option 1'},
        options: [
            {id: '1', label: 'Option 1'},
            {id: '2', label: 'Option 2'},
        ],
    },
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/CQS7dIcNELi5HMFoEoNcsX/Nexo-Labs?node-id=83-4246&t=6S2t4TA9HCLBkeoP-4'
		}
	}
} satisfies Meta<ToggleButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {};
export const Mobile = { parameters: mobileParameters };