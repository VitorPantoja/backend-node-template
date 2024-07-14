import type { Request } from 'express';

export async function requestHeaderToken(req: Request): Promise<string | null> {
  const { body, headers, query } = req;
  const token = headers?.authorization || headers?.['x-access-token'] || query?.token || body?.token;
  if (!token) return null;
  if (token.startsWith('Bearer')) return token.slice(7, token.length);

  return token;
}
