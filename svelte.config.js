// import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from "svelte-adapter-appengine";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({

			// Build output directory (default: `/build`)
			out: "/build",

			// Enable Google Cloud Tracing Agent for improved logging (default: `false`)
			useCloudTracing: false,

			// Enable or disable Google Cloud Logging (default: `false`)
			// See: https://cloud.google.com/logging/docs/overview
			useCloudLogging: false,

			// Specify external modules for the esbuild step
			external: [],

			// Specify Node modules to be added to the `package.json` file in the build step
			// These modules will be fetched when the application is deployed
			dependencies: [],

			// Set the Node.js version for the App Engine runtime (default: `18`)
			// See available runtimes: https://cloud.google.com/appengine/docs/standard/nodejs/runtime
			nodejsRuntime: 22,
		})
	}
};

export default config;
