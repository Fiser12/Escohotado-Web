const path = require('path');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../apps/server/**/*.{js,ts,jsx,tsx}',
    '../../packages/gaudi/**/*.{js,ts,jsx,tsx}',
    '!../../apps/server/node_modules/**',
    '!../../packages/gaudi/node_modules/**',
  ],
	theme: {
		extend: {
			screens: {},
			colors: {
				'generic-main': '#D9D9D2',
				'generic-secondary': '#B6B7A3',
				'generic-bg-dark': '#222222',
				'title-primary': '#0E2F41',
				'menu-section-title': '#939393',
				'text-primary': '#333333'
			},
			fontFamily: {
				escohotado: ['Escohotado', 'serif'],
				yesevaone: ['YesevaOne', 'serif'],
				montserrat: ['Montserrat', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
