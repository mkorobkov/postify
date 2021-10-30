import { parse } from 'cookie';
import { prerendering } from '$app/env';
import type { Locals } from '$lib/types';
import type { Handle } from '@sveltejs/kit';
import type { User } from './routes/users/_typings';

const AUTH_COOKIE_NAME = 'token';

export const handle: Handle<Locals> = async ({ request, resolve }) => {
  if (!prerendering) {
    const jwt = (await import('@tsndr/cloudflare-worker-jwt')).default;
    const cookie = parse(request.headers['cookie'] || '');
    const signedToken = cookie[AUTH_COOKIE_NAME];
    if (signedToken) {
      const isValid = await jwt.verify(signedToken, global.JWT_SECRET);
      if (isValid) {
        request.locals.user = jwt.decode(signedToken) as User;
      }
    }
  }

  return resolve(request);
};
