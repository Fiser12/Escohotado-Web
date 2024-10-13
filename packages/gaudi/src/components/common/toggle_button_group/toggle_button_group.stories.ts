import type { Meta, StoryObj } from '@storybook/svelte';
import { ToggleButtonGroup, storybookHelpers } from 'gaudi';

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
			url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=490-2187&m=dev'
		}
	}
} satisfies Meta<ToggleButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {};
export const Mobile = { parameters: storybookHelpers.mobileParameters };