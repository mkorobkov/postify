<script lang="ts">
	import { goto } from '$app/navigation';
	import DocumentForm, { FormDocument } from '$lib/document-form.svelte';
	import type { SvelteComponentTyped } from 'svelte';
	import Layout from '$lib/layout.svelte';
	import Button from '$lib/button.svelte';
	import { createDocument } from '../api/create-document';

	// to submit form from parent
	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;
	let loading = false;

	async function handleSubmit(event: CustomEvent<FormDocument>) {
		loading = true;

		try {
			const result = await createDocument({ ...event.detail, isEncrypted: false });
			goto(`/${result.document.documentId}`);
		} catch (err) {
			alert(err?.message ?? 'Error occurred');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head><title>Create document — Postify</title></svelte:head>

<Layout>
	<div slot="aside">
		<Button on:click={documentFormRef.submitForm} disabled={loading}>Publish</Button>
	</div>
	<DocumentForm bind:this={documentFormRef} on:submit={handleSubmit} {loading} />
</Layout>
