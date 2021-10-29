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
	import TipTap from '$lib/tip-tap.svelte';

	export let doc: GetDocumentData['document'];
	export let isOwner: boolean;

	let edit = false;
	let content = doc.content ?? { type: 'doc' };
</script>

<a href="/">main page</a>
{#if isOwner && !edit}
	<button on:click={() => (edit = true)}>Edit</button>
{/if}

{#if edit}
	<button on:click={() => (edit = !edit)}>Save post</button>
{/if}

<div>{JSON.stringify(doc)}</div>

<TipTap bind:content bind:editable={edit} />

<p>Content array length: {JSON.stringify(content)}</p>

<DocumentDetails {...doc} />
