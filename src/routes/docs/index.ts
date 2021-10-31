import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import type { PostDocumentInput, PostDocumentResponse } from './_typings';
import { createDocumentAndReturn, documentResponse } from './_utils';

export const post: RequestHandler<Locals, PostDocumentInput, Typify<PostDocumentResponse>> = async (
	request
) => {
	try {
		const document = await createDocumentAndReturn(request);

		return documentResponse(document, true);
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
