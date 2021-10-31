<script context="module" lang="ts">
	export type FormDocument = Pick<Document, 'author' | 'content' | 'title'>;
</script>

<script lang="ts">
	import type { Document } from 'src/routes/docs/_typings';
	import { createEventDispatcher } from 'svelte';
	import TipTap from './tip-tap.svelte';

	export let loading = false;
	export let autoFocus: 'title' | 'content' = 'title';

	export let document: Readonly<Partial<FormDocument>> = {
		author: '',
		title: '',
	};

	let formContent = document.content;
	let formTitle = document.title;
	let formAuthor = document.author;

	const dispatch = createEventDispatcher<{
		submit: FormDocument;
	}>();

	export const submitForm = () => {
		console.log('[DocumentForm]: please submit form', { formAuthor, formContent, formTitle });

		dispatch('submit', {
			author: formAuthor,
			content: formContent,
			title: formTitle,
		});
	};
</script>

<form on:submit|preventDefault={submitForm}>
	<div class:show={loading} class:loading={true} />
	<label class:has-value={formTitle.length > 0} class="document-title">
		<!-- svelte-ignore a11y-autofocus -->
		<input bind:value={formTitle} autofocus={autoFocus === 'title'} />
		<span>Title</span>
	</label>
	<label class:has-value={formAuthor.length > 0} class="document-author">
		<input bind:value={formAuthor} />
		<span>Author</span>
	</label>
	<div class="document-content">
		<TipTap bind:content={formContent} editable={true} autoFocus={autoFocus === 'content'} />
	</div>
</form>

<style lang="less">
	.loading {
		display: none;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.6);
		cursor: progress;
		z-index: 1;

		&.show {
			display: block;
		}
	}
	form {
		position: relative;
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
</style>
