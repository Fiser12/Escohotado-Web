import type { Meta, StoryObj } from '@storybook/react';
import { menuSectionsLoaderMock, mockUser } from 'hegel';
import storybookHelpers from '../../storybook-helpers';
import { Header } from './header';

const meta = {
	title: 'Components/Header',
	component: Header,
	args: {
		user: mockUser,
		signIn: async () => {},
		signOut: async () => {},
		menuSections : menuSectionsLoaderMock(mockUser),

	},
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev'
		}
	}
} satisfies Meta<typeof Header>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {}};
export const Mobile: Story = { parameters: storybookHelpers.mobileParameters };