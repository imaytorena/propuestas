import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Otras configuraciones...
		env: {
			private: {
				DIRECT_URL: process.env.DIRECT_URL, // Para el servidor
				DATABASE_URL: process.env.DATABASE_URL // Para el servidor
			}
		}
	}
};

export default config;
