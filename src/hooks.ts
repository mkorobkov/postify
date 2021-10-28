import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	request.locals.userid = 'user id passed';

	return resolve(request);
};
