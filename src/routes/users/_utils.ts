import type { User } from './_typings';

export async function generateAuthToken(user: User): Promise<string> {
  const jwt = (await import('@tsndr/cloudflare-worker-jwt')).default;

  return await jwt.sign(user, global.JWT_SECRET);
}
