<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Document, GetDocumentResponse } from '../documents/_typings';

	export const load: Load<{ pageParams: { documentId: string } }> = async (params) => {
		const { page, fetch } = params;

		const response = await fetch(`/documents/${page.params.documentId}`);

		if (response.status === 404) {
			return { status: 301, redirect: '/' };
		}

		// todo: add try/catch
		const documentResponse = (await response.json()) as GetDocumentResponse;

		if (documentResponse.success === true) {
			return {
				props: {
					loadedDocument: documentResponse.data.document,
					isOwner: documentResponse.data.isOwner,
				},
			};
		} else {
			return {
				status: response.status,
				error: new Error(`${documentResponse.message}`),
			};
		}
	};
</script>

<script lang="ts">
	import DocumentDetails from '$lib/document-details.svelte';
	import DocumentForm, { FormDocument } from '$lib/document-form.svelte';
	import type { SvelteComponentTyped } from 'svelte';
	import Layout from '$lib/layout.svelte';
	import Button from '$lib/button.svelte';
	import { updateDocument } from '../../api/update-document';

	export let loadedDocument: Document;
	export let isOwner: boolean;

	let key = {};

	$: if (loadedDocument) {
		key = {}; // remount DocumentForm to reset its state
	}

	let loading = false;
	let edit = false;
	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;

	async function handleSubmit(event: CustomEvent<FormDocument>) {
		loading = true;

		try {
			const result = await updateDocument(
				{ ...event.detail, isEncrypted: false },
				loadedDocument.documentId
			);
			loadedDocument = result.document;
			isOwner = result.isOwner;
			edit = false;
		} catch (err) {
			alert(err?.message ?? 'Error occurred');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head><title>{loadedDocument.title ?? 'Document'} — Postify</title></svelte:head>

<Layout>
	<div slot="aside">
		{#if isOwner && !edit}
			<Button on:click={() => (edit = true)}>Edit</Button>
		{/if}

		{#if edit && documentFormRef}
			<Button on:click={() => documentFormRef?.submitForm()}>Update</Button>
		{/if}
	</div>

	{#if edit}
		{#key key}
			<DocumentForm
				autoFocus="content"
				bind:this={documentFormRef}
				document={loadedDocument}
				on:submit={handleSubmit}
				{loading}
			/>
		{/key}
	{:else}
		<DocumentDetails document={loadedDocument} />
	{/if}
</Layout>
