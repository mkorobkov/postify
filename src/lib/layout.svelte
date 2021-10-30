<script>
	import '../app.css';
	import '../document.css';
</script>

<div class="wrapper">
	<main>
		<slot />
	</main>
	<aside><slot name="aside" /></aside>
</div>

<style>
	main {
		display: grid;
	}
	.wrapper {
		position: relative;
		width: 700px;
		margin: 0 auto;
		min-height: 100vh;
		display: grid;
		align-content: flex-start;
	}
	aside {
		top: 20px;
		position: absolute;
		left: 100%;
		margin-left: 20px;
		display: grid;
		gap: 8px;
	}
</style>
