<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import TipTap from './tip-tap.svelte';

	export let title: string;
	export let author: string;
	export let content: TipTapJSONContent;
</script>

<article>
	<h1>Document details</h1>
	<h2>{title}</h2>
	<h3>{author}</h3>
	<TipTap {content} editable={false} />
</article>
