<script>
	import { navigating } from '$app/stores';
</script>

{#if $navigating}
	Loading...
{:else}
	<p><a href="/existing">Existing post</a></p>
	<p><a href="/non-existent">non-existent post</a></p>
{/if}
