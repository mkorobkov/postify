<script lang="ts">
	import DocumentForm from '$lib/document-form.svelte';

	import type { SvelteComponentTyped } from 'svelte';

	let documentFormRef: (SvelteComponentTyped & { submitForm(): unknown }) | undefined;

	function handleSubmit(
		event: CustomEvent<{
			title: string;
		}>
	) {
		console.log('event', event, event.detail);
	}
</script>

<a href="/">Main page</a>
<DocumentForm bind:this={documentFormRef} on:submit={handleSubmit} />
