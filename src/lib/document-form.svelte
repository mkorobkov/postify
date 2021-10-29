<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import { createEventDispatcher } from 'svelte';
	import TipTap from './tip-tap.svelte';

	export let title: string;
	export let author: string;
	export let content: TipTapJSONContent;

	$: formContent = content;
	$: formTitle = title;
	$: formAuthor = author;

	const dispatch = createEventDispatcher<{
		submit: { title: string; author: string; content: TipTapJSONContent };
	}>();

	export const submitForm = () => {
		console.log('[DocumentForm]: please submit form', { formAuthor, formContent, formTitle });

		dispatch('submit', {
			author: formAuthor,
			content: formContent,
			title: formTitle
		});
	};
</script>

<article>
	<h1>Edit document</h1>
	<input bind:value={formTitle} />
	<input bind:value={formAuthor} />
	<TipTap bind:content={formContent} editable={true} />
	<button on:click={submitForm}>Form submit</button>
</article>
