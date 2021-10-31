<script lang="ts">
	import { goto } from '$app/navigation';
	import DocumentForm, { FormDocument } from '$lib/document-form.svelte';
	import type { SvelteComponentTyped } from 'svelte';
	import Layout from '$lib/layout.svelte';
	import Button from '$lib/button.svelte';
	import type { PostDocumentResponse } from './docs/_typings';

	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;
	let loading = false;

	async function createDocument(data: FormDocument) {
		const res = await fetch('/docs', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...data, isEncrypted: false })
		});

		const result = (await res.json()) as PostDocumentResponse;

		if (result.success === false) {
			throw new Error(result?.message);
		}

		return result.data;
	}

	async function handleSubmit(event: CustomEvent<FormDocument>) {
		loading = true;

		try {
			const result = await createDocument(event.detail);
			goto(`/${result.document.documentId}`);
		} catch (err) {
			alert(err?.message ?? 'Error occurred');
		} finally {
			loading = false;
		}
	}

	// todo: when loading, then show spinner upfront the form
</script>

<Layout>
	<div slot="aside">
		<a href="/">Main page</a>
		<Button on:click={documentFormRef.submitForm} disabled={loading} class="publish">Publish</Button
		>
	</div>
	<div class="container">
		<DocumentForm bind:this={documentFormRef} on:submit={handleSubmit} />
	</div>
</Layout>

<style lang="less">
	.container {
		position: relative;
		height: 100%;
		min-height: 100vh;
		display: grid;
	}
</style>
