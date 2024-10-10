import type { Meta, StoryObj } from '@storybook/svelte';
import { EscotaButton } from '../index';

const meta = {
	title: 'Escohotado/Atoms/EscotaButton',
	component: EscotaButton,
	tags: ['autodocs']
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
