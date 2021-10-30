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

	export let doc: GetDocumentData['document'];
	export let isOwner: boolean;

	let edit = false;
	let documentFormRef:
		| (SvelteComponentTyped & { submitForm(): unknown; focusContent(): unknown })
		| undefined;

	$: if (edit) {
		documentFormRef?.focusContent();
	}

	function handleSubmit(
		event: CustomEvent<{
			title: string;
		}>
	) {
		console.log('event', event, event.detail);
	}
</script>

<Layout>
	<div slot="aside">
		<a href="/">Main page</a>
		{#if isOwner && !edit}
			<button on:click={() => (edit = true)}>Edit</button>
		{/if}

		{#if edit}
			<button on:click={() => (edit = !edit)}>Save post</button>
		{/if}

		{#if documentFormRef}
			<button on:click={() => documentFormRef?.submitForm()}>Submit from parent</button>
		{/if}
	</div>

	{#if edit}
		<DocumentForm {...doc} bind:this={documentFormRef} on:submit={handleSubmit} />
	{:else}
		<DocumentDetails {...doc} />
	{/if}
</Layout>
