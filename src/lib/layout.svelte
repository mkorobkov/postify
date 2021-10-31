<script>
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
</div>

<style>
	main {
		display: grid;
		align-content: flex-start;
		grid-template-rows: 1fr;
	}
	.wrapper {
		position: relative;
		width: 700px;
		margin: 0 auto;
		min-height: 100vh;
		display: grid;
		grid-template-rows: 1fr;
		align-content: flex-start;
	}
	aside {
		top: 32px;
		position: absolute;
		left: 100%;
		margin-left: 20px;
		display: grid;
		gap: 8px;
	}
</style>
