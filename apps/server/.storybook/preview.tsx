import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from "react";
import { Textures } from "gaudi/client";
import "../src/app/tailwind.css";

const preview: Preview = {
	decorators: [
		(Story) => (
			<>
				<Story />
				{Textures.map((Element: any, index) => <Element key={index} />)}
			</>
		),
	],
	parameters: {
		backgrounds: {
			values: [
				{ name: 'Dark', value: '#001827' },
				{ name: 'Light', value: '#FFFFFF' },
				{ name: 'Gray', value: '#F4F4F4' },
			],
			default: 'Light',
		},
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
