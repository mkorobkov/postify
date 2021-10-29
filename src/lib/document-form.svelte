<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import TipTap from './tip-tap.svelte';

	export let title: string;
	export let author: string;
	export let content: TipTapJSONContent;

	$: formContent = content;
	$: formTitle = title;
	$: formAuthor = author;

	export const submitForm = () => {
		console.log('please submit form', { formAuthor, formContent, formTitle });
	};
</script>

<article>
	<h1>Edit document</h1>
	<input bind:value={formTitle} />
	<input bind:value={formAuthor} />
	<TipTap bind:content={formContent} editable={true} />
	<button on:click={submitForm}>Form submit</button>
</article>
