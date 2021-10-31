import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { v4 as uuid } from '@lukeed/uuid';

import { mockedDocument } from './_mocked-document';

import type {
	Document,
	PostDocumentInput,
	PostDocumentResponse,
	PutDocumentResponse,
} from './_typings';

export const post: RequestHandler<Locals, PostDocumentInput, Typify<PostDocumentResponse>> = async (
	request
) => {
	try {
		const { isEncrypted, title, author, content } = request.body;

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
			content,
		};

		await DOCUMENTS_KV.put(document.documentId, JSON.stringify(document));

		return {
			status: 200,
			body: {
				success: true,
				data: {
					isOwner: document.authorId === request.locals.user.id,
					document,
				},
			},
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
			body: { success: false, message: badRequestError ? err.message : 'Internal Server Error' },
		};
	}
};
