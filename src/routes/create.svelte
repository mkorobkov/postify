<script lang="ts">
	import { goto } from '$app/navigation';
	import DocumentForm from '$lib/document-form.svelte';
	import type { SvelteComponentTyped } from 'svelte';
	import Layout from '$lib/layout.svelte';
	import Button from '$lib/button.svelte';

	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;
	let loading = false;

	async function createDocument(data: { title: string }) {
		const res = await fetch('/docs', {
			method: 'POST',
			body: JSON.stringify({ ...data, isEncrypted: false })
		});
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
