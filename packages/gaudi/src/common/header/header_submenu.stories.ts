import type { Meta, StoryObj } from '@storybook/react';
import { mockAdminUser, menuSectionsLoaderMock } from 'hegel';
import { HeaderSubmenu } from './header_submenu.js';
import storybookHelpers from '../../storybook-helpers.js';

const meta = {
	title: 'Common/Components/Header/SubMenu',
	component: HeaderSubmenu,
	args: {
        user: mockAdminUser,
		menuSectionsLoader : menuSectionsLoaderMock,
		toggleMenu: () => {}
    },
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=440-6646&m=dev'
		}
	}
} satisfies Meta<typeof HeaderSubmenu>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {}};
export const Mobile: Story = { parameters: storybookHelpers.mobileParameters };

