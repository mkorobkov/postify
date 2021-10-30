<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import { createEventDispatcher } from 'svelte';
	import TipTap from './tip-tap.svelte';

	export let title: string = '';
	export let author: string = '';
	export let content: TipTapJSONContent;

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
	<label class:has-value={formTitle.length > 0}>
		<input bind:value={formTitle} class="input title" />
		<span>Title</span>
	</label>
	<label class:has-value={formAuthor.length > 0}>
		<input bind:value={formAuthor} class="input author" />
		<span>Author</span>
	</label>
	<TipTap bind:content={formContent} editable={true} />
</form>

<style lang="less">
	form {
		display: flex;
		flex-direction: column;
	}

	label {
		position: relative;

		&.has-value > span {
			visibility: hidden;
			right: 100%;
			left: auto;
			opacity: 0;
		}

		&.has-value {
			input:focus + span {
				visibility: visible;
				opacity: 1;
			}
		}

		& > span {
			touch-action: none;
			color: rgba(0, 0, 0, 0.4);
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			transition: opacity 0.3s;
		}
	}

	.input {
		border: none;
		outline: none;
		font-family: Roboto, sans-serif;
		font-style: normal;
		font-weight: normal;
		color: rgba(0, 0, 0, 0.8);
	}

	.title {
		font-size: 24px;
	}
	.author {
		font-size: 16px;
	}
</style>
