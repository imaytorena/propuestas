import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// you can override defaults here
			out: 'build',
			precompress: false,
			envPrefix: '',
			polyfill: true
		}),
		files: {
			hooks: {
				server: 'src/hooks.server'
			}
		}
	},
	preprocess: vitePreprocess()
};

export default config;
