import type { Meta, StoryObj } from '@storybook/svelte';
import { EscotaButton } from 'gaudi';

const meta = {
	title: 'Common/Atoms/EscotaButton',
	component: EscotaButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=55-116&m=dev'
		}
	}
} satisfies Meta<EscotaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		text: 'Descubre al maestro',
		variant: 'primary'
	}
};

export const Secondary: Story = {
	args: {
		text: 'Descubre al maestro',
		variant: 'secondary'
	}
};

export const Transparent: Story = {
	args: {
		text: 'Descubre al maestro',
		variant: 'transparent'
	}
};
