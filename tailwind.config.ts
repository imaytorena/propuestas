import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { theme } from './src/lib/theme';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [typography, daisyui],
	theme: {

		fontFamily: {
			sans: ['Albert Sans', 'sans-serif'],
			mono: [ 'monospace'],
		},
		extend: {}
	},
	daisyui: {
		themes: [{ pactos: theme }],
		log: false
	}
} satisfies Config;
