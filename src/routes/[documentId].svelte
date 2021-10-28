<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { GetDocumentResponse } from './docs/_typings';

	export const load: Load<{ pageParams: { documentId: string } }> = async (params) => {
		const { page, fetch, session, stuff } = params;

		console.log('load page', page.params.documentId);

		const response = await fetch(`/docs/${page.params.documentId}`);

		// todo: add try/catch
		const documentResponse = (await response.json()) as GetDocumentResponse;

		if (documentResponse.success === true) {
			return {
				props: {
					doc: documentResponse
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

<script>
	export let doc;
</script>

<h1>Here will be post</h1>
{JSON.stringify(doc)}
