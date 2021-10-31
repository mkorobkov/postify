<script lang="ts">
	import { generateHTML } from '@tiptap/html';
	import StarterKit from '@tiptap/starter-kit';

	import type { Document } from 'src/routes/docs/_typings';

	export let document: Partial<Document>;

	$: html = document.content === undefined ? '' : generateHTML(document.content, [StarterKit]);
</script>

<article>
	<h1 class="document-title">{document.title ?? ''}</h1>
	<p class="document-author">{document.author ?? ''}</p>
	<div class="document-content">{@html html}</div>
</article>

<style lang="less">
	article {
		padding: 32px 0 0;
	}
</style>
