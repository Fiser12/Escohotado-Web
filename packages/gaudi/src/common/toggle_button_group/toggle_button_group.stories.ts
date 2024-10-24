import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButtonGroup } from './toggle_button_group.js'; // Adjust the import path if needed
import storybookHelpers from '../../storybook-helpers.js';

const meta = {
  title: 'Common/Atoms/Toggle Button Group',
  component: ToggleButtonGroup,
  args: {
    selected: { id: '1', label: 'Option 1' },
    options: [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2' },
    ],
    setOption: () => {},
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=490-2187&m=dev',
    },
  },
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: storybookHelpers.mobileParameters,
};