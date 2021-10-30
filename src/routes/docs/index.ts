import type { Locals } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

// create document: POST /docs
export const post: RequestHandler<Locals> = async (request) => {
	console.log('[docs post request]', request);
	try {
		const parsedBody = JSON.parse(request.body as string) as { title: string };

		// console.log(request.locals.userid);

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
