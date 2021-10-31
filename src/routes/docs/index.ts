import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { v4 as uuid } from '@lukeed/uuid';
import type { Document, PostDocumentInput } from './_typings';
import type { JSONString } from '@sveltejs/kit/types/helper';
import { mockedDocument } from './_mocked-document';

import type { GetDocumentResponse } from './_typings';
// create document: POST /docs
export const post: RequestHandler<Locals> = async (request) => {
	try {
		const { isEncrypted, title, author, content } = request.body as any as PostDocumentInput;

		if (typeof isEncrypted !== 'boolean')
			throw new Error('Bad isEncrypted param. Should be boolean.');
		if (typeof title !== 'string') throw new Error('Bad title param. Should be string.');
		if (typeof author !== 'string') throw new Error('Bad author param. Should be string.');
		if (typeof content !== 'object') throw new Error('Bad content param. Should be object.');

		const document: Document = {
			documentId: uuid(),
			authorId: request.locals.user.id,
			isEncrypted,
			title,
			author,
			content
		};

		await DOCUMENTS_KV.put(document.documentId, JSON.stringify(document));

		return {
			status: 200,
			body: {
				success: true,
				data: {
					isOwner: document.authorId === request.locals.user.id,
					document: document as any as JSONString
				}
			}
		};
	} catch (err) {
		let badRequestError = true;
		if (
			!err.message ||
			(err.message &&
				!err.message.includes('in JSON at position') &&
				!err.message.includes('param. Should be'))
		) {
			badRequestError = false;
		}

		if (!badRequestError) {
			console.error(err);
		}

		return {
			status: badRequestError ? 400 : 500,
			body: { success: false, message: badRequestError ? err.message : 'Internal Server Error' }
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
