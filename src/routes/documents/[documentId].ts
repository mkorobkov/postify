import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { getFaunaError } from './_fauna-utils';
import type { GetDocumentResponse, PutDocumentInput, PutDocumentResponse } from './_typings';
import {
	documentResponse,
	getDocumentByRequest,
	isBadRequestError,
	notFoundResponse,
	updateDocumentAndReturn,
} from './_utils';

export const get: RequestHandler<Locals, unknown, Typify<GetDocumentResponse>> = async (
	request
) => {
	const document = await getDocumentByRequest(request);

	if (document) {
		const isOwner = document.authorId === request.locals.user.id;
		return documentResponse(document, isOwner);
	}

	return notFoundResponse();
};

export const put: RequestHandler<Locals, PutDocumentInput, Typify<PutDocumentResponse>> = async (
	request
) => {
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
		const badRequestError = isBadRequestError(err.message);
		if (!badRequestError) {
			console.error(JSON.stringify(request));
			console.error(err);

			if (err.requestResult) {
				console.error('fauna error');
				console.error(getFaunaError(err));
			}
		}

		return {
			status: badRequestError ? 400 : 500,
			body: { success: false, message: badRequestError ? err.message : 'Internal Server Error' },
		};
	}
};
