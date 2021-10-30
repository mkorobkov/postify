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
	<h1>Document details</h1>
	<h2>{title}</h2>
	<h3>{author}</h3>
	<div>{@html html}</div>
</article>
