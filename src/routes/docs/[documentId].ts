import { dev } from '$app/env';
import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { mockedDocument } from './_mocked-document';
import type {
	Document,
	GetDocumentResponse,
	PutDocumentInput,
	PutDocumentResponse,
} from './_typings';
import {
	documentResponse,
	getDocumentByRequest,
	notFoundResponse,
	updateDocumentAndReturn,
} from './_utils';

export const get: RequestHandler<Locals, unknown, Typify<GetDocumentResponse>> = async (
	request
) => {
	const document = await getDocumentByRequest(request);

	if (dev) {
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
	}

	if (document) {
		const isOwner = document.authorId === request.locals.user.id;
		return documentResponse(document, isOwner);
	}

	return notFoundResponse();
};

export const put: RequestHandler<Locals, PutDocumentInput, Typify<PutDocumentResponse>> = async (
	request
) => {
	if (dev) return devPutResponse(request);

	const document = await getDocumentByRequest(request);

	if (!document) return notFoundResponse();
	if (document.authorId !== request.locals.user.id) {
		return {
			status: 401,
			body: {
				success: false,
				message: 'You must be the author of the document',
			},
		};
	}

	try {
		const { isEncrypted, title, author, content } = request.body;
		const updatedDocument = await updateDocumentAndReturn({
			...document,
			isEncrypted,
			title,
			author,
			content,
		});

		return documentResponse(updatedDocument, true);
	} catch (err) {
		let badRequestError = true;
		if (!err.message || (err.message && !err.message.includes('param. Should be'))) {
			badRequestError = false;
		}

		if (!badRequestError) {
			console.error(JSON.stringify(request));
			console.error(err);
		}

		return {
			status: badRequestError ? 400 : 500,
			body: { success: false, message: badRequestError ? err.message : 'Internal Server Error' },
		};
	}
};

function devPutResponse(request): any {
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
					...(request.body as any as Document),
					documentId: request.params.documentId,
				},
				isOwner: true, // because we editing it
			},
		},
	};
}
