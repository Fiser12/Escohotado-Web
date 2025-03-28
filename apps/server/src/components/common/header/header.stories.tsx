import type { Meta, StoryObj } from '@storybook/react';
import { mobileParameters } from '../../storybook-helpers';
import { Header } from './header';
import { mockUser, menuSectionsLoaderMock } from '../../mockData/user.model';

const meta: Meta<typeof Header> = {
	title: 'Organism/Header',
	component: Header,
	args: {
		user: mockUser,
		pageItems: [],
		logoutMenuItem: {
			text: 'Logout',
			href: '/logout',
		},
		signIn: async () => { },
		menuSections: menuSectionsLoaderMock(mockUser),
	},
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=166-258&m=dev'
		},
		backgrounds: {
			default: 'oscuro',
			values: [
				{ name: 'claro', value: '#f8f8f8' },
				{ name: 'oscuro', value: '#333333' },
				{ name: 'rojo', value: '#f00' },
			],
		},
	}
} satisfies Meta<typeof Header>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {} };
export const Mobile: Story = { parameters: mobileParameters };