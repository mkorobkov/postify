import type { Handle } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

export const handle: Handle<Locals> = async ({ request, resolve }) => {
	request.locals.userid = 'user id passed';

	return resolve(request);
};
