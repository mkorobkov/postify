<script>
	import { navigating } from '$app/stores';
	import Layout from '$lib/layout.svelte';
</script>

<Layout>
	<p><a href="/create">Create document</a></p>
	<br />
	<p><a href="/existing">Existing post</a></p>
	<p><a href="/existing-author">Existing post (authoring)</a></p>
	<p><a href="/non-existent">non-existent post</a></p>
</Layout>
