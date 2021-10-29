<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import TipTap from './tip-tap.svelte';

	export let title = '';
	export let author = '';
	export let content: TipTapJSONContent = { type: 'doc' };
</script>

<article>
	<h1>Document details</h1>
	<h2>{title}</h2>
	<h3>{author}</h3>
	<TipTap {content} editable={false} />
</article>
