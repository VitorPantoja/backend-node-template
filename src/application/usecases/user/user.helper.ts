import { createHash } from 'crypto';
import { hash as bcryptHash, compare as bcryptCompare } from 'bcryptjs';

/**
 * Hashes a password using SHA-256 algorithm.
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */
export function hashPassword(password: string): string {
  const sha256 = createHash('sha256');
  sha256.update(password);
  return sha256.digest('hex');
}

/**
 * Generates a hashed password using bcrypt with specified salt rounds.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - A promise resolving to the hashed password.
 */
export async function generateHashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcryptHash(password, saltRounds);
}

/**
 * Verifies if a password matches a hashed password.
 * @param {string} password - The plain password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise resolving to a boolean indicating whether the passwords match.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcryptCompare(password, hashedPassword);
}
// Verificar a senha
// export const isPasswordCorrect = verifyPassword(plainPassword, hashedPassword);
// if (isPasswordCorrect) {
//   console.log('Senha correta');
// } else {
//   console.log('Senha incorreta');
// }
