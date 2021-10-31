import { dev } from '$app/env';
import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { mockedDocument } from './_mocked-document';
import type { Document, GetDocumentResponse, PutDocumentResponse } from './_typings';

export const get: RequestHandler<Locals, unknown, Typify<GetDocumentResponse>> = async (
	request
) => {
	const { documentId } = request.params;

	let document: Document;

	/* try to get document from cache */
	try {
		const cached = await DOCUMENTS_KV.get(documentId, { type: 'json' });
		if (cached !== null) {
			document = cached as Document;
		}
	} catch {
		/* ignore error on JSON.parse */
	}

	// if document is not found on cache
	// or user requesting the document is the author(we should take document from storage instead of cache)
	if (!document || document.authorId === request.locals.user.id) {
		// todo try to get from data storage
		// document =
	}

	if (dev) {
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
	}

	if (document) {
		return {
			status: 200,
			body: {
				success: true,
				data: { document, isOwner: document.authorId === request.locals.user.id },
			},
		};
	}

	return {
		status: 404,
		body: {
			success: false,
			message: 'Document is not found',
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
