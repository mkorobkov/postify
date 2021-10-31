import { v4 as uuid } from '@lukeed/uuid';

import { mockedDocument } from './_mocked-document';

import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import type { Document, GetDocumentResponse, PutDocumentResponse } from './_typings';

// get document: GET /docs/document-id
export const get: RequestHandler<Locals, unknown, Typify<GetDocumentResponse>> = async (
	request
) => {
	const { documentId } = request.params;

	if (documentId !== 'existing' && documentId !== 'existing-author') {
		return { status: 404, body: { success: false, message: 'err' } };
	}

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
					isEncrypted: false,
				},
				isOwner: documentId === 'existing-author',
			},
		},
	};
};

// replace document PUT /docs/docId
export const put: RequestHandler<Locals, unknown, Typify<PutDocumentResponse>> = async (
	request
) => {
	const {
		params: { documentId },
		body,
	} = request;
	console.log('[docs put request', request, 'documentId', documentId);

	await new Promise((resolve) => setTimeout(resolve, 2000));

	const newDocument = body as any as Document;

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
					isEncrypted: false,
					...newDocument,
					documentId,
				},
				isOwner: true, // because we editing it
			},
		},
	};
};
