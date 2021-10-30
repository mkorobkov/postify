<script lang="ts">
	import type { Editor } from '@tiptap/core';

	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import { createEventDispatcher } from 'svelte';
	import TipTap from './tip-tap.svelte';

	export let title: string = '';
	export let author: string = '';
	export let content: TipTapJSONContent | undefined = undefined;

	$: formContent = content;
	$: formTitle = title;
	$: formAuthor = author;
	let editor: Editor | undefined; // to focus from outside

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

	export const focusContent = () => {
		editor.commands.focus('end');
	};
</script>

<form on:submit|preventDefault={submitForm}>
	<label class:has-value={formTitle.length > 0} class="document-title">
		<input bind:value={formTitle} />
		<span>Title</span>
	</label>
	<label class:has-value={formAuthor.length > 0} class="document-author">
		<input bind:value={formAuthor} />
		<span>Author</span>
	</label>
	<div class="document-content">
		<TipTap bind:content={formContent} bind:editor editable={true} />
	</div>
</form>

<style lang="less">
	form {
		display: grid;
		grid-template-rows: auto auto 1fr;
		padding-top: 32px;
	}

	label {
		position: relative;
		cursor: text;

		input {
			width: 100%;
			font-size: inherit;
			border: none;
		}

		&.has-value > span {
			visibility: hidden;
			right: 100%;
			margin-right: 12px;
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
			user-select: none;
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
</style>
