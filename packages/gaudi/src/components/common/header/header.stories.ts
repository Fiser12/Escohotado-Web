import type { Meta, StoryObj } from '@storybook/svelte';
import { Header, storybookHelpers } from 'gaudi';
import { menuSectionsLoaderMock, mockUser } from 'hegel';

const meta = {
	title: 'Common/Components/Header',
	component: Header,
	args: {
		user: mockUser,
		signIn: () => {},
		menuSectionsLoader: menuSectionsLoaderMock

	},
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev'
		}
	}
} satisfies Meta<Header>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {}};
export const Mobile: Story = { parameters: storybookHelpers.mobileParameters };