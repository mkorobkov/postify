import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import type { GetDocumentResponse } from './_typings';

// get document: GET /docs/document-id
export const get: RequestHandler<Locals, unknown, Typify<GetDocumentResponse>> = async (
	request
) => {
	console.log('[docs get request]', request);

	const { documentId } = request.params;

	if (documentId !== 'existing') {
		return { status: 404, body: { success: false, message: 'qwe' } };
	}

	return {
		status: 200,
		body: {
			success: true,
			data: { document: { author: '', content: '', title: '' }, isOwner: false }
		}
	};
};
