import type { Meta, StoryObj } from '@storybook/svelte';
import { HeaderSubMenu } from 'index';
import { mockAdminUser, menuSectionsLoaderMock } from 'hegel';
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
			url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=440-6646&m=dev'
		}
	}
} satisfies Meta<HeaderSubMenu>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = { parameters: {}};
export const Mobile: Story = { parameters: mobileParameters };

