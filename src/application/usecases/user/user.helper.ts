import { compare as bcryptCompare, hash as bcryptHash } from 'bcryptjs';
import { hash } from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';

import { env } from '../../../infrastructure/config/environment';

export function hashPassword(password: string, salt: string): string {
  // md5 não é seguro, mas é apenas para fins de teste
  const hashMd5 = createHash('md5').update(`${password}${salt}`).digest('hex');
  // const sha256 = createHash('sha256');
  // sha256.update(password);
  // return sha256.digest('hex');
  return hashMd5;
}

export function generateSalt(): string {
  return randomBytes(env.SALTS_ROUNDS).toString('hex');
}

export async function generateHashPassword2(password: string) {
  const Pbcrypt = await hash(password, 8);
  return Pbcrypt;
}

export async function generateHashPassword(password: string): Promise<string> {
  const saltRounds = generateSalt();
  return await bcryptHash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcryptCompare(password, hashedPassword);
}
