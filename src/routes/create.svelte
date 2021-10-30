<script lang="ts">
	import { goto } from '$app/navigation';
	import DocumentForm from '$lib/document-form.svelte';
	import type { SvelteComponentTyped } from 'svelte';

	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;
	let loading = false;

	async function createDocument(data: { title: string }) {
		const res = await fetch('/docs', { method: 'POST', body: JSON.stringify(data) });
		const result = (await res.json()) as any;

		if (!result.success) {
			throw new Error(result?.message);
		}

		return result.data as string;
	}

	async function handleSubmit(
		event: CustomEvent<{
			title: string;
		}>
	) {
		loading = true;

		try {
			const docId = await createDocument(event.detail);
			goto(`/${docId}`);
		} catch (err) {
			alert(err?.message ?? 'Error occurred');
		} finally {
			loading = false;
		}
	}

	// todo: when loading, then show spinner upfront the form
</script>

<a href="/">Main page</a>

<DocumentForm bind:this={documentFormRef} on:submit={handleSubmit} />

<button on:click={documentFormRef.submitForm} disabled={loading}>Publish</button>
