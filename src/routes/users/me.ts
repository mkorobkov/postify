import type { Locals } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import type { JSONString } from '@sveltejs/kit/types/helper';


export const get: RequestHandler<Locals> = async (request) => {
  return {
    status: 200,
    body: { success: true, user: request.locals.user as any as JSONString },
  };
};
