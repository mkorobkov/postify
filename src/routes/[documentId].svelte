<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type {
		Document,
		GetDocumentResponse,
		PutDocumentInput,
		PutDocumentResponse,
	} from './docs/_typings';

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

	export let doc: Document;
	export let isOwner: boolean;

	let edit = false;
	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;
	let loading = false;

	async function updateDocument(data: FormDocument) {
		const body: PutDocumentInput = {
			...data,
			isEncrypted: false,
			documentId: 'doc-id',
		};

		const res = await fetch('/docs', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const result = (await res.json()) as PutDocumentResponse;

		if (result.success === false) {
			throw new Error(result?.message);
		}

		return result.data;
	}

	async function handleSubmit(event: CustomEvent<FormDocument>) {
		loading = true;

		try {
			const result = await updateDocument(event.detail);
			doc = result.document;
			isOwner = result.isOwner;
			edit = false;
		} catch (err) {
			alert(err?.message ?? 'Error occurred');
		} finally {
			loading = false;
		}
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

		{#if documentFormRef}
			<Button on:click={() => documentFormRef?.submitForm()}>Submit from parent</Button>
		{/if}
	</div>

	{#if edit}
		<DocumentForm
			{loading}
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
