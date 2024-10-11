import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		sveltekit()
	],
	server: {
		host: true
	},
	resolve: {
		alias: {
			'gaudi': "/src",
			'index': "/src/index.ts"
		}
	}
});
