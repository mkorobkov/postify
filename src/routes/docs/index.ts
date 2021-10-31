import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { mockedDocument } from './_mocked-document';

import type { GetDocumentResponse } from './_typings';
// create document: POST /docs
export const post: RequestHandler<Locals> = async (request) => {
	console.log('[docs post request]', request);
	try {
		const parsedBody = JSON.parse(request.body as string) as { title: string };

		await new Promise((resolve) => setTimeout(resolve, 2000));

		return {
			status: 200,
			body: { success: true, data: parsedBody.title.split(' ').join('').toLowerCase() } // remove spaces
		};
	} catch (err) {
		return {
			status: 400,
			body: { success: false, message: err?.message ?? 'Error occurred' }
		};
	}
};

// replace document PUT /docs/docId
export const put: RequestHandler<Locals, unknown, Typify<GetDocumentResponse>> = async (
	request
) => {
	const { documentId } = request.params;
	// console.log('[docs put request', request);

	return {
		status: 200,
		body: {
			success: true,
			data: {
				document: {
					author: 'name here',
					content: mockedDocument,
					title: 'First document',
					authorId: 'qwerty',
					documentId,
					isEncrypted: false
				},
				isOwner: documentId === 'existing-author'
			}
		}
	};
};
