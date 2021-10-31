import type { Locals, Typify } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import type { GetUsersMeResponse } from './_typings';

export const get: RequestHandler<Locals, unknown, Typify<GetUsersMeResponse>> = async (request) => {
  return {
    status: 200,
    body: { success: true, user: request.locals.user },
  };
};
