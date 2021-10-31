import { prerendering } from '$app/env';
import { parse } from 'cookie';

import { v4 as uuid } from '@lukeed/uuid';

import { generateAuthToken } from './routes/users/_utils';

import type { Locals } from '$lib/types';
import type { Handle } from '@sveltejs/kit';
import type { User } from './routes/users/_typings';
const AUTH_COOKIE_NAME = 'token';

export const handle: Handle<Locals> = async ({ request, resolve }) => {
	if (prerendering) return resolve(request);
	const jwt = (await import('@tsndr/cloudflare-worker-jwt')).default;
	const cookie = parse(request.headers['cookie'] || '');
	const signedToken = cookie[AUTH_COOKIE_NAME];
	if (signedToken) {
		const isValid = await jwt.verify(signedToken, JWT_SECRET);
		if (isValid) {
			request.locals.user = jwt.decode(signedToken) as User;
		}
	}

	if (request.locals.user) return resolve(request);

	/* generate new user and assign to current request */
	const newUser: User = {
		id: uuid(),
		name: '',
	};

	request.locals.user = newUser;

	const response = await resolve(request);

	/* add auth token for future requests */
	response.headers['Set-Cookie'] = `token=${await generateAuthToken(newUser)};HttpOnly;Path=/;`;

	return response;
};
