<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { GetDocumentData, GetDocumentResponse, TipTapJSONContent } from './docs/_typings';

	export const load: Load<{ pageParams: { documentId: string } }> = async (params) => {
		const { page, fetch, session, stuff } = params;

		console.log('load page', page.params.documentId);

		const response = await fetch(`/docs/${page.params.documentId}`);

		// todo: add try/catch
		const documentResponse = (await response.json()) as GetDocumentResponse;

		if (documentResponse.success === true) {
			return {
				props: {
					doc: documentResponse.data.document,
					isOwner: documentResponse.data.isOwner
				}
			};
		} else {
			return {
				status: response.status,
				error: new Error(`${documentResponse.message}`)
			};
		}
	};
</script>

<script lang="ts">
	import DocumentDetails from '$lib/document-details.svelte';
	import DocumentForm from '$lib/document-form.svelte';
	import type { SvelteComponentTyped } from 'svelte';
	import Layout from '$lib/layout.svelte';
	import Button from '$lib/button.svelte';

	export let doc: GetDocumentData['document'];
	export let isOwner: boolean;

	let edit = false;
	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;

	function handleSubmit(
		event: CustomEvent<{
			title: string;
		}>
	) {
		console.log('event', event, event.detail);
	}
</script>

<Layout>
	<div slot="aside" class="aside-content">
		<Button href="/create">Main page</Button>

		{#if isOwner && !edit}
			<Button on:click={() => (edit = true)}>Edit post</Button>
		{/if}
		{#if !edit}
			<Button href="/create">Create new</Button>
		{/if}

		{#if edit}
			<Button on:click={() => (edit = !edit)}>Save post</Button>
		{/if}

		{#if documentFormRef}
			<Button on:click={() => documentFormRef?.submitForm()}>Submit from parent</Button>
		{/if}
	</div>

	{#if edit}
		<DocumentForm
			{...doc}
			bind:this={documentFormRef}
			on:submit={handleSubmit}
			autoFocus="content"
		/>
	{:else}
		<DocumentDetails {...doc} />
	{/if}
</Layout>

<style>
	.aside-content {
		display: grid;
		gap: 8px;
	}
</style>
