<script context="module" lang="ts">
	export type FormDocument = Pick<Document, 'author' | 'content' | 'title'>;
</script>

<script lang="ts">
	import type { Document } from 'src/routes/docs/_typings';
	import { createEventDispatcher } from 'svelte';
	import Loading from './loading.svelte';
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
	{#if loading}
		<Loading />
	{/if}
	<label class:has-value={formTitle.length > 0} class="document-title">
		<!-- svelte-ignore a11y-autofocus -->
		<input bind:value={formTitle} autofocus={autoFocus === 'title'} placeholder="Title" />
		<span>Title</span>
	</label>
	<label class:has-value={formAuthor.length > 0} class="document-author">
		<input bind:value={formAuthor} placeholder="Author" />
		<span>Author</span>
	</label>
	<div class="document-content">
		<TipTap bind:content={formContent} autoFocus={autoFocus === 'content'} />
	</div>
</form>

<style lang="less">
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

			&::placeholder {
				color: rgba(0, 0, 0, 0.25);
			}
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
			color: rgba(0, 0, 0, 0.25);
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			transition: opacity 0.3s;
			visibility: hidden;
			right: 100%;
			margin-right: 20px;
			left: auto;
			opacity: 0;

			border-right: 1px solid rgba(0, 0, 0, 0.25);
			padding-right: 12px;
			display: none;

			@media (min-width: 900px) {
				display: block;
			}
		}
	}
</style>
