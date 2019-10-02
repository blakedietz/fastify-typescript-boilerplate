import assert from 'assert';

export function validateEnvironment({
  DATABASE_URL = '',
  POSTGRES_DB = '',
  POSTGRES_USER = '',
  PRIVATE_KEY = '',
  PUBLIC_KEY = '',
  AWS_ACCESS_KEY_ID = '',
  AWS_SECRET_ACCESS_KEY = '',
}) {
  assert.notStrictEqual(DATABASE_URL, '', 'DATABASE_URL is not set.');
  assert.notStrictEqual(PRIVATE_KEY, '', 'PRIVATE_KEY is not set.');
  assert.notStrictEqual(PUBLIC_KEY, '', 'PUBLIC_KEY is not set.');
  assert.notStrictEqual(AWS_ACCESS_KEY_ID, '', 'AWS_ACCESS_KEY_ID is not set.');
  assert.notStrictEqual(
    AWS_SECRET_ACCESS_KEY,
    '',
    'AWS_SECRET_ACCESS_KEY is not set.',
  );
}
