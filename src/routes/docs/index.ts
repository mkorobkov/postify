import type { Locals } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

// create document: POST /docs
export const post: RequestHandler<Locals> = async (request) => {
	console.log('[docs post request]', request);

	console.log(request.locals.userid);

	return {
		status: 200,
		body: {}
	};
};
