import type { Locals } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

// get document: GET /docs/document-id
export const get: RequestHandler<Locals> = async (request) => {
	console.log('[docs get request]', request);

	const { documentId } = request.params;

	if (documentId !== 'existing') {
		return { status: 404, body: { success: false } };
	}

	return {
		status: 200,
		body: { success: true }
	};
};
