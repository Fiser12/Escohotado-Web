import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import "../src/app/tailwind.css";

const preview: Preview = {
  parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset'
		},  
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		options: {
			storySort: {
			  order: ['Components', 'Organism', 'Molecules', 'Atoms', 'Pages'],
			},
		},
  },
};

export default preview;
