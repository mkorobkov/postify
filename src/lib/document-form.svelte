<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import { createEventDispatcher } from 'svelte';
	import TipTap from './tip-tap.svelte';

	export let title: string = '';
	export let author: string = '';
	export let content: TipTapJSONContent = { type: 'doc' };

	$: formContent = content;
	$: formTitle = title;
	$: formAuthor = author;

	const dispatch = createEventDispatcher<{
		submit: { title: string; author: string; content: TipTapJSONContent };
	}>();

	export const submitForm = () => {
		console.log('[DocumentForm]: please submit form', { formAuthor, formContent, formTitle });

		// todo: validate form...

		dispatch('submit', {
			author: formAuthor,
			content: formContent,
			title: formTitle
		});
	};
</script>

<form on:submit|preventDefault={submitForm}>
	<label>
		<span>Title</span>
		<input bind:value={formTitle} class="input title" placeholder="Title" />
	</label>
	<label>
		<span>Author</span>
		<input bind:value={formAuthor} class="input author" placeholder="Author" />
	</label>
	<TipTap bind:content={formContent} editable={true} />
</form>

<style lang="less">
	form {
		display: flex;
		flex-direction: column;
	}

	.input {
		border: none;
		outline: none;
		font-family: Roboto, sans-serif;
		font-style: normal;
		font-weight: normal;
		color: rgba(0, 0, 0, 0.4);
		&::placeholder {
			color: red;
		}
	}

	.title {
		font-size: 24px;
	}
	.author {
		font-size: 16px;
	}
</style>
