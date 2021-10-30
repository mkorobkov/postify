<script lang="ts">
	import { generateHTML } from '@tiptap/html';
	import StarterKit from '@tiptap/starter-kit';

	import type { TipTapJSONContent } from 'src/routes/docs/_typings';

	export let title: string;
	export let author: string;
	export let content: TipTapJSONContent;

	$: html = generateHTML(content, [StarterKit]);
</script>

<article>
	<h1 class="document-title">{title}</h1>
	<p class="document-author">{author}</p>
	<div class="document-content">{@html html}</div>
</article>

<style lang="less">
	article {
		padding: 32px 0 0;
	}
	h1 {
		font-weight: normal;
	}
</style>
