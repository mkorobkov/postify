import type { RequestHandler } from '@sveltejs/kit';

// get document: GET /docs/document-id
export const get: RequestHandler = async (request) => {
	console.log('[docs get request]', request);

	return {
		status: 200,
		body: {}
	};
};
