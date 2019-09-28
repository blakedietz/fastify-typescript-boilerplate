const shelljs = require('shelljs');
const { writeFileSync } = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

exports.command = 'init';
exports.describe = `Setup your environment with minimal configurations`;
exports.handler = () => {
  shelljs.cd(process.cwd());

  const environments = ['dev', 'test', 'prod'];

  // Make folders
  for (const environment of environments) {
    shelljs.mkdir('-p', `configs/${environment}`);
    const key = new NodeRSA({ b: 512 });

    const privateKey = key.exportKey('pkcs1-private-pem');
    const publicKey = key.exportKey('pkcs8-public-pem');
    const postgresUser = `postgres`;
    const postgresPassword = `password`;
    const postgresHost = `localhost`;
    const postgresPort = `5432`;
    const database = `boilerplate_${environment}`;
    const databaseConnectionString = `postgres://${postgresUser}:${postgresPassword}@${postgresHost}:${postgresPort}/${database}`;

    const envFile = `DATABASE_URL=${databaseConnectionString}
POSTGRES_DB=${database}
POSTGRES_PASSWORD=${postgresPassword}
POSTGRES_USER=${postgresUser}
# Note that the quotes are necessary for the jsonwebtoken library
# Otherwise you'll get an ERR_OSSL_PEM_NO_START_LINE upon signing
PRIVATE_KEY="${privateKey.replace(/\n/g, '\\n')}"
PUBLIC_KEY="${publicKey.replace(/\n/g, '\\n')}"`;
    const envFilePath = path.join(
      process.cwd(),
      'configs',
      environment,
      `.env`,
    );
    writeFileSync(envFilePath, envFile);
  }
};
