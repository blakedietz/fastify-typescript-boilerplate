// Wrap callback based functions in promises
import bcrypt from 'bcrypt';
import { promisify } from 'util';

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

export async function comparePasswordHash({
  hashedPassword,
  clearTextPassword,
}): Promise<boolean> {
  return compare(clearTextPassword, hashedPassword);
}

export async function hashPassword({ password }): Promise<string> {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return hash(password, salt);
}
