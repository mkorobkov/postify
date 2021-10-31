import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare-workers';
import svg from '@poppanator/sveltekit-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({ less: true }),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter(),
		vite: {
			plugins: [svg()],
		},
	},
};

export default config;
