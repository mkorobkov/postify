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
	import TipTap from '$lib/tip-tap.svelte';

	export let doc: GetDocumentData['document'];
	export let isOwner: boolean;
</script>

<a href="/">main page</a>
<h1>Here will be post</h1>
<div>{isOwner}</div>
<div>{JSON.stringify(doc)}</div>

<TipTap content={doc.content} editable={isOwner} />
