<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load<{ pageParams: { documentId: string } }> = async (params) => {
		const { page, fetch, session, stuff } = params;

		console.log('load page', page.params.documentId);

		const response = await fetch(`/docs/${page.params.documentId}`);

		const res = await response.json();

		if (res.success) {
			return {
				props: {
					doc: res
				}
			};
		} else {
			return {
				status: response.status,
				error: new Error(`Could not load document with id: ${page.params.documentId}`)
			};
		}
	};
</script>

<script>
	export let doc;
</script>

<h1>Here will be post</h1>
{JSON.stringify(doc)}
