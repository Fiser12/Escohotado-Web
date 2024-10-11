import type { Meta, StoryObj } from '@storybook/svelte';
import HeaderSubMenu from '../header/header_submenu/header_submenu.svelte';
import { mockAdminUser, menuSectionsLoaderMock } from 'gaudi/mockData/user.model.js';
import { mobileParameters } from 'gaudi/components/storybook.js';

const meta = {
	title: 'Common/Components/Header/SubMenu',
	component: HeaderSubMenu,
	args: {
        user: mockAdminUser,
		menuSectionsLoader : menuSectionsLoaderMock,
		toggleMenu: () => {}
    },
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/design/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=441-7374&t=w8HFySdc4mVtGh0h-4'
		}
	}
} satisfies Meta<HeaderSubMenu>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {}};
export const Mobile: Story = { parameters: mobileParameters };

