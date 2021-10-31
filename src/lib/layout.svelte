<script>
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/700.css';
	import '../app.css';
	import '../document.css';
	import { navigating } from '$app/stores';
	import Loading from './loading.svelte';
</script>

<div class="wrapper">
	{#if $navigating}
		<Loading />
	{/if}
	<main>
		<slot />
	</main>
	<aside><slot name="aside" /></aside>
	<footer>
		<p>Inspired by <a href="https://telegra.ph/" target="_blank">Telegra.ph</a></p>
		<p>
			Made with <a href="https://kit.svelte.dev/" target="_blank">Svelte kit (SSR)</a> and
			<a href="https://tiptap.dev/" target="_blank">tiptap</a>
		</p>
		<p>
			Delivered and hosted by <a href="https://workers.dev" target="_blank">Cloudflare workers</a>
		</p>
		<p>
			Source code: <a href="https://github.com/mkorobkov/postify">Github</a>
		</p>
	</footer>
</div>

<style lang="less">
	main {
		display: grid;
		align-content: flex-start;
		grid-template-rows: 1fr;
		flex: 1;
	}
	.wrapper {
		position: relative;
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 0 20px;
	}
	aside {
		display: grid;
		gap: 8px;
		padding-top: 32px;

		@media (min-width: 1020px) {
			top: 0;
			position: fixed;
			left: 50%;
			width: 120px;
			margin-left: 370px;
		}
	}

	footer {
		color: rgba(0, 0, 0, 0.3);
		text-align: center;
		padding: 32px;
		display: grid;
		gap: 4px;

		a {
			transition: 0.1s;

			&:hover {
				color: rgba(0, 0, 0, 0.7);
			}
		}
	}
</style>
