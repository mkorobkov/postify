<script lang="ts">
	import { generateHTML } from '@tiptap/html';
	import StarterKit from '@tiptap/starter-kit';

	import type { Document } from '../routes/docs/_typings';

	export let document: Partial<Document>;

	$: html = document.content === undefined ? '' : generateHTML(document.content, [StarterKit]);
</script>

<article>
	{#if document.title}
		<h1 class="document-title">{document.title}</h1>
	{/if}
	{#if document.author}
		<p class="document-author">{document.author ?? ''}</p>
	{/if}
	<div class="document-content">{@html html}</div>
</article>

<style lang="less">
	article {
		padding: 32px 0 0;
	}
</style>
