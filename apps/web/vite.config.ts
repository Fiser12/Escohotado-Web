import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite'
import houdini from 'houdini/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		houdini(),
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'nexo-labs',
				project: 'escohotado'
			}
		}),
		sveltekit()
	],
	server: {
		host: true,
		fs: {
			allow: ["../.."]
		},
		proxy: {
			'/api': {
				target: `http://localhost:3000`,
				changeOrigin: true,
				secure: false,
				ws: true
			}
		}
	}
});

